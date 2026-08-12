import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'

const ATTIO_API = "https://api.attio.com/v2";
const LIST_ID = "5e0fffa2-0b50-455a-bd47-c16d3c1010cf";

const key = () => Deno.env.get("ATTIO_API_KEY") ?? "";

async function attio(path: string, init: RequestInit = {}) {
  const res = await fetch(`${ATTIO_API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${key()}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });
  const text = await res.text();
  let json: unknown = null;
  try { json = text ? JSON.parse(text) : null; } catch { json = { raw: text }; }
  return { ok: res.ok, status: res.status, json };
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  if (!key()) return json({ error: "Attio API key not configured" }, 500);

  // Inspection helper: GET returns the list config + its attributes.
  if (req.method === "GET") {
    const list = await attio(`/lists/${LIST_ID}`);
    const attrs = await attio(`/lists/${LIST_ID}/attributes`);
    return json({ list: list.json, attributes: attrs.json });
  }

  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const str = (v: unknown, max = 300) =>
    typeof v === "string" ? v.trim().slice(0, max) : "";

  const name = str(body.name);
  const company = str(body.company);
  const jobTitle = str(body.jobTitle);
  const region = str(body.region, 20);
  const spend = str(body.spend, 60);
  const workforce = str(body.workforce, 60);
  const source = str(body.source, 60) || "Website";

  if (!name || !company || !jobTitle || !region || !workforce) {
    return json({ error: "Missing required fields" }, 400);
  }

  // 1. Create the person record in Attio.
  const person = await attio(`/objects/people/records`, {
    method: "POST",
    body: JSON.stringify({
      data: {
        values: {
          name: [{ full_name: name }],
          job_title: jobTitle,
          description: `${source} signup — ${company} (${region})`,
        },
      },
    }),
  });

  if (!person.ok) {
    console.error("Attio person create failed", person.status, JSON.stringify(person.json));
    return json({ error: "Could not save to Attio" }, 502);
  }

  const recordId = (person.json as any)?.data?.id?.record_id;

  // 2. Add the person to the waitlist list, with notes captured on the entry.
  const notes = [
    `Company: ${company}`,
    `Job title: ${jobTitle}`,
    `Region: ${region}`,
    spend ? `Annual agency spend: ${spend}` : `Annual agency spend: not provided`,
    `Agency workforce size: ${workforce}`,
    `Source: ${source}`,
  ].join("\n");

  const entry = await attio(`/lists/${LIST_ID}/entries`, {
    method: "POST",
    body: JSON.stringify({
      data: {
        parent_record_id: recordId,
        parent_object: "people",
        entry_values: {},
      },
    }),
  });

  if (!entry.ok) {
    console.error("Attio list entry failed", entry.status, JSON.stringify(entry.json));
    return json({ error: "Could not add to Attio list" }, 502);
  }

  const entryId = (entry.json as any)?.data?.id?.entry_id;

  // 3. Attach the submitted details as a note on the person record.
  const note = await attio(`/notes`, {
    method: "POST",
    body: JSON.stringify({
      data: {
        parent_object: "people",
        parent_record_id: recordId,
        title: `${source} submission`,
        format: "plaintext",
        content: notes,
      },
    }),
  });
  if (!note.ok) {
    console.error("Attio note failed", note.status, JSON.stringify(note.json));
  }

  return json({ success: true, record_id: recordId, entry_id: entryId });
});
