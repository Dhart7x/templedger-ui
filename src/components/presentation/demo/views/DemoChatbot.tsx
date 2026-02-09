import { useState } from "react";
import { Send, Sparkles, HelpCircle, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: string;
}

const suggestedQuestions = [
  "Why is James Wilson blocked?",
  "What's missing for Ahmed Khan's payroll?",
  "How do I resolve a no-show?",
  "What happens if compliance expires?",
];

const DemoChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content: "Hi! I'm your Temp Ledger assistant. I can help you understand what's blocked, what's missing, and what to do next. Try asking me about specific workers or issues.",
      timestamp: "Just now",
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSend = (question?: string) => {
    const text = question || inputValue;
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: text,
      timestamp: "Just now",
    };

    // Generate response based on question
    let response = "";
    const lowerText = text.toLowerCase();

    if (lowerText.includes("james wilson") || lowerText.includes("blocked")) {
      response = `**James Wilson is currently blocked** due to a no-show on his scheduled shift.

**Status:** Blocked at step 5 (Clock-in)
**Impact:** Cannot proceed to payroll or billing

**To resolve:**
1. Agency must confirm worker status (On the Way with ETA, or Replacement)
2. If no-show confirmed, mark as absent in the system
3. Future deployments will require manager approval

The ledger prevents blocked workers from appearing in payroll until the issue is resolved.`;
    } else if (lowerText.includes("ahmed khan") || lowerText.includes("payroll")) {
      response = `**Ahmed Khan's payroll status:**

✅ Clocked in: 05:58
✅ Clocked out: 14:02
⏳ **Manager approval pending** - 4 hours overtime requires client decision

**What happens next:**
- Client must approve or reject overtime hours
- Once approved, payroll automatically unlocks
- Rate verification is already complete

You can find this in **Payroll > Pending Approval**.`;
    } else if (lowerText.includes("no-show") || lowerText.includes("resolve")) {
      response = `**How to resolve a no-show:**

1. **Check Live Snapshot** for the affected worker
2. **Agency options:**
   - Mark worker as "On the Way" with ETA
   - Select replacement from Standby Pool
   - Confirm as absent (triggers backup procedures)

3. **Client notification** happens automatically
4. **Ledger records** the resolution for audit

No-shows block that worker from payroll for the affected shift until resolved.`;
    } else if (lowerText.includes("compliance") || lowerText.includes("expires")) {
      response = `**When compliance expires:**

🔴 **Immediate effects:**
- Worker moves to "Blocked" status
- Cannot be scheduled for new shifts
- Existing assignments flagged for replacement

📋 **Required actions:**
- Agency uploads new documents
- System verifies compliance
- Worker returns to "Active" status

The ledger tracks compliance expiry dates and sends warnings 14 days before expiry.`;
    } else {
      response = `I understand you're asking about "${text}". 

Here's what I can help you with:
- **Worker status** - Why is someone blocked?
- **Payroll issues** - What's stopping a payment?
- **Compliance** - What documents are missing?
- **Process questions** - What happens next?

Try being specific with a worker name or issue type.`;
    }

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: "assistant",
      content: response,
      timestamp: "Just now",
    };

    setMessages([...messages, userMessage, assistantMessage]);
    setInputValue("");
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-foreground">Temp Ledger Assistant</h1>
            <p className="text-xs text-muted-foreground">Ask about blocks, issues, or next steps</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.type === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              <div className="text-sm whitespace-pre-wrap">
                {message.content.split("\n").map((line, i) => {
                  // Bold text
                  const parts = line.split(/(\*\*.*?\*\*)/g);
                  return (
                    <p key={i} className="mb-1 last:mb-0">
                      {parts.map((part, j) => {
                        if (part.startsWith("**") && part.endsWith("**")) {
                          return <strong key={j}>{part.slice(2, -2)}</strong>;
                        }
                        // Status icons
                        if (part.startsWith("✅")) {
                          return <span key={j} className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-green-500 inline" />{part.slice(1)}</span>;
                        }
                        if (part.startsWith("⏳")) {
                          return <span key={j} className="flex items-center gap-1"><Clock className="w-3 h-3 text-amber-500 inline" />{part.slice(1)}</span>;
                        }
                        if (part.startsWith("🔴")) {
                          return <span key={j} className="flex items-center gap-1"><AlertTriangle className="w-3 h-3 text-destructive inline" />{part.slice(1)}</span>;
                        }
                        return part;
                      })}
                    </p>
                  );
                })}
              </div>
              <p className="text-xs opacity-60 mt-2">{message.timestamp}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Suggested Questions */}
      {messages.length <= 2 && (
        <div className="px-4 pb-2">
          <p className="text-xs text-muted-foreground mb-2">Suggested questions:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((q) => (
              <button
                key={q}
                onClick={() => handleSend(q)}
                className="text-xs px-3 py-1.5 bg-muted rounded-full hover:bg-muted/80 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Ask a question..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1"
          />
          <Button size="icon" onClick={() => handleSend()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DemoChatbot;
