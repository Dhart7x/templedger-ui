import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'

const ATTIO_API = "https://api.attio.com/v2";
const LISTS: Record<string, string> = {
  waitlist: "5e0fffa2-0b50-455a-bd47-c16d3c1010cf",
  demo: "738f5137-33c4-4dbe-a584-0f88c7de121c",
};

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

  const url = new URL(req.url);
  const setup = url.searchParams.get("setup");
  if (req.method === "GET" && setup && LISTS[setup]) {
    const attrs = [
      ["Company", "company", "Company name from the website form"],
      ["Job title", "job_title", "Job title from the website form"],
      ["Region", "region", "Region selected on the website form"],
      ["Annual agency spend", "annual_agency_spend", "Annual agency spend from the website form"],
      ["Agency workforce size", "agency_workforce_size", "Agency workforce size from the website form"],
      ["Source", "source", "Which website form was submitted"],
    ];
    const results: unknown[] = [];
    for (const [title, api_slug, description] of attrs) {
      const r = await attio(`/lists/${LISTS[setup]}/attributes`, {
        method: "POST",
        body: JSON.stringify({
          data: { title, api_slug, description, type: "text", is_multiselect: false, is_required: false, is_unique: false, config: {} },
        }),
      });
      results.push({ api_slug, ok: r.ok, status: r.status });
    }
    return json({ setup, results });
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
  const listKey = str(body.list, 20) === "demo" ? "demo" : "waitlist";
  const LIST_ID = LISTS[listKey];

  if (!name || !company || !jobTitle || !region || !workforce) {
    return json({ error: "Missing required fields" }, 400);
  }

  const nameParts = name.split(/\s+/);
  const firstName = nameParts[0];
  const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

  // 1. Create the person record in Attio.
  const person = await attio(`/objects/people/records`, {
    method: "POST",
    body: JSON.stringify({
      data: {
        values: {
          name: [{ first_name: firstName, last_name: lastName, full_name: name }],
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

  // 2. Add the person to the waitlist list with the form answers as entry values.
  const notes = [
    `Company: ${company}`,
    `Job title: ${jobTitle}`,
    `Region: ${region}`,
    `Annual agency spend: ${spend || "not provided"}`,
    `Agency workforce size: ${workforce}`,
    `Source: ${source}`,
  ].join("\n");

  const entryValues: Record<string, string> = {
    company,
    job_title: jobTitle,
    region,
    annual_agency_spend: spend || "Not provided",
    agency_workforce_size: workforce,
    source,
  };

  let entry = await attio(`/lists/${LIST_ID}/entries`, {
    method: "POST",
    body: JSON.stringify({
      data: { parent_record_id: recordId, parent_object: "people", entry_values: entryValues },
    }),
  });

  // If the list columns are missing, still add the person to the list.
  if (!entry.ok) {
    console.error("Attio entry with values failed", entry.status, JSON.stringify(entry.json));
    entry = await attio(`/lists/${LIST_ID}/entries`, {
      method: "POST",
      body: JSON.stringify({
        data: { parent_record_id: recordId, parent_object: "people", entry_values: {} },
      }),
    });
  }

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
