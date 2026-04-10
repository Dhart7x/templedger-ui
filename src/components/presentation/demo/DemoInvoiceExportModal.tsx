import { useState } from "react";
import { Check, Send, Download, FileText, Building2, CreditCard, Mail, ChevronRight, X, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Client, CreditControlDefaults } from "./demoData";

interface DemoInvoiceExportModalProps {
  open: boolean;
  onClose: () => void;
  client: Client | null;
  weekEnding: string;
  hasExceptions?: boolean;
  hasOverrides?: boolean;
  onExportComplete?: (data: ExportData) => void;
}

export interface ExportData {
  client: Client;
  weekEnding: string;
  invoiceTotal: number;
  paymentTerms: number;
  contactEmail1: string;
  contactEmail2?: string;
  sendStatements: boolean;
  statementDay?: number;
  copyFinanceProvider: boolean;
  financeProvider?: string;
  exportMethod: "secure-link" | "email-attachment";
  includeEventSequence: boolean;
  includeExceptionExplanations: boolean;
  includeApprovalSignatures: boolean;
  includeOverrideNotes: boolean;
  timestamp: string;
}

const financeProviders = [
  { value: "ultimate", label: "Ultimate Finance" },
  { value: "bibby", label: "Bibby Financial Services" },
  { value: "hsbc", label: "HSBC Invoice Finance" },
  { value: "close", label: "Close Brothers Invoice Finance" },
  { value: "other", label: "Other" },
];

const paymentTermsOptions = [7, 14, 30, 45, 60, 90];

const workers = [
  { name: "John Patel", status: "Approved", hours: 40, amount: 520 },
  { name: "Maria Santos", status: "Approved", hours: 38, amount: 494 },
  { name: "Ahmed Khan", status: "Approved with override", hours: 42, amount: 567 },
  { name: "Lucy Brown", status: "Approved", hours: 40, amount: 560 },
];

const DemoInvoiceExportModal = ({
  open,
  onClose,
  client,
  weekEnding,
  hasExceptions = false,
  hasOverrides = true,
  onExportComplete,
}: DemoInvoiceExportModalProps) => {
  const [step, setStep] = useState(1);
  const [exportInvoice, setExportInvoice] = useState(true);
  const [includeEventSequence, setIncludeEventSequence] = useState(false);
  const [includeExceptionExplanations, setIncludeExceptionExplanations] = useState(true);
  const [includeApprovalSignatures, setIncludeApprovalSignatures] = useState(true);
  const [includeOverrideNotes, setIncludeOverrideNotes] = useState(true);
  
  // Credit Control fields
  const [paymentTerms, setPaymentTerms] = useState("30");
  const [contactEmail1, setContactEmail1] = useState(client?.creditControl?.contactEmail1 || "");
  const [contactEmail2, setContactEmail2] = useState(client?.creditControl?.contactEmail2 || "");
  const [sendStatements, setSendStatements] = useState(client?.creditControl?.sendStatements || false);
  const [statementDay, setStatementDay] = useState("1");
  const [copyFinanceProvider, setCopyFinanceProvider] = useState(client?.creditControl?.copyFinanceProvider || false);
  const [financeProvider, setFinanceProvider] = useState(client?.creditControl?.financeProvider || "");
  const [customProviderEmail, setCustomProviderEmail] = useState("");
  const [saveAsDefault, setSaveAsDefault] = useState(false);
  const [exportMethod, setExportMethod] = useState<"secure-link" | "email-attachment">("secure-link");
  const [acknowledgeExceptions, setAcknowledgeExceptions] = useState(false);
  
  const [exportComplete, setExportComplete] = useState(false);

  const invoiceTotal = workers.reduce((sum, w) => sum + w.amount, 0);

  const handleClose = () => {
    setStep(1);
    setExportComplete(false);
    setAcknowledgeExceptions(false);
    onClose();
  };

  const handleSend = () => {
    if (onExportComplete && client) {
      onExportComplete({
        client,
        weekEnding,
        invoiceTotal,
        paymentTerms: parseInt(paymentTerms),
        contactEmail1,
        contactEmail2,
        sendStatements,
        statementDay: sendStatements ? parseInt(statementDay) : undefined,
        copyFinanceProvider,
        financeProvider: copyFinanceProvider ? financeProvider : undefined,
        exportMethod,
        includeEventSequence,
        includeExceptionExplanations,
        includeApprovalSignatures,
        includeOverrideNotes,
        timestamp: new Date().toISOString(),
      });
    }
    setExportComplete(true);
  };

  if (!client) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg bg-card border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <FileText className="w-5 h-5 text-primary" />
            Export Invoice & Backups
          </DialogTitle>
        </DialogHeader>

        {exportComplete ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Export Sent Successfully</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {exportMethod === "secure-link" ? "Secure link sent to recipients" : "Email with attachments sent"}
              </p>
            </div>
            <div className="text-xs text-muted-foreground space-y-1 bg-muted/30 rounded-lg p-3">
              <div><span className="text-muted-foreground">Timestamp: </span><span className="text-foreground">{new Date().toLocaleString()}</span></div>
              <div><span className="text-muted-foreground">Recipients: </span><span className="text-foreground">{contactEmail1}{contactEmail2 && `, ${contactEmail2}`}</span></div>
              {copyFinanceProvider && financeProvider && (
                <div><span className="text-muted-foreground">Finance Provider: </span><span className="text-foreground">Copied</span></div>
              )}
              {exportMethod === "secure-link" && (
                <div><span className="text-muted-foreground">Link Expiry: </span><span className="text-foreground">14 days</span></div>
              )}
            </div>
            <Button variant="outline" size="sm" className="text-xs">
              View in Audit Log
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Step Indicator */}
            <div className="flex items-center justify-center gap-2 pb-2 border-b border-border">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div
                    className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-colors",
                      step >= s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    )}
                  >
                    {s}
                  </div>
                  {s < 3 && (
                    <ChevronRight className={cn("w-4 h-4 mx-1", step > s ? "text-primary" : "text-muted-foreground")} />
                  )}
                </div>
              ))}
            </div>

            {step === 1 && (
              <div className="space-y-4">
                <div className="text-sm font-medium text-foreground">Export Options</div>
                
                <div className="space-y-3">
                  <label className="flex items-start gap-3 cursor-pointer p-3 rounded-lg border border-border hover:border-primary/30 transition-colors">
                    <Checkbox
                      checked={exportInvoice}
                      onCheckedChange={(c) => setExportInvoice(c === true)}
                      className="mt-0.5"
                    />
                    <div>
                      <div className="text-sm font-medium text-foreground">Export Invoice & Backups to Client</div>
                      <div className="text-xs text-muted-foreground">Send invoice with supporting documentation</div>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer p-3 rounded-lg border border-border hover:border-primary/30 transition-colors">
                    <Checkbox
                      checked={includeEventSequence}
                      onCheckedChange={(c) => setIncludeEventSequence(c === true)}
                      className="mt-0.5"
                    />
                    <div>
                      <div className="text-sm font-medium text-foreground">Include full event sequence per worker</div>
                      <div className="text-xs text-muted-foreground">Complete audit trail for each worker</div>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer p-3 rounded-lg border border-border hover:border-primary/30 transition-colors">
                    <Checkbox
                      checked={includeExceptionExplanations}
                      onCheckedChange={(c) => setIncludeExceptionExplanations(c === true)}
                      className="mt-0.5"
                    />
                    <div>
                      <div className="text-sm font-medium text-foreground">Include exception explanations</div>
                      <div className="text-xs text-muted-foreground">Details of any resolved exceptions</div>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer p-3 rounded-lg border border-border hover:border-primary/30 transition-colors">
                    <Checkbox
                      checked={includeApprovalSignatures}
                      onCheckedChange={(c) => setIncludeApprovalSignatures(c === true)}
                      className="mt-0.5"
                    />
                    <div>
                      <div className="text-sm font-medium text-foreground">Include approval signatures</div>
                      <div className="text-xs text-muted-foreground">Manager approval records</div>
                    </div>
                  </label>

                  {hasOverrides && (
                    <label className="flex items-start gap-3 cursor-pointer p-3 rounded-lg border border-amber-500/30 bg-amber-500/5 hover:border-amber-500/50 transition-colors">
                      <Checkbox
                        checked={includeOverrideNotes}
                        onCheckedChange={(c) => setIncludeOverrideNotes(c === true)}
                        className="mt-0.5"
                      />
                      <div>
                        <div className="text-sm font-medium text-foreground">Include override notes in backup</div>
                        <div className="text-xs text-amber-400">Contains overrides - recommended to include</div>
                      </div>
                    </label>
                  )}
                </div>

                <Button
                  className="w-full"
                  onClick={() => setStep(2)}
                  disabled={!exportInvoice}
                >
                  Continue
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-primary" />
                  <div className="text-sm font-medium text-foreground">Credit Control</div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-muted-foreground">Payment Terms (days)</label>
                    <Select value={paymentTerms} onValueChange={setPaymentTerms}>
                      <SelectTrigger className="w-full mt-1 bg-background">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        {paymentTermsOptions.map((term) => (
                          <SelectItem key={term} value={term.toString()}>{term} days</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-xs text-muted-foreground">Contact Email 1 *</label>
                    <Input
                      type="email"
                      value={contactEmail1}
                      onChange={(e) => setContactEmail1(e.target.value)}
                      placeholder="accounts@client.com"
                      className="mt-1 bg-background"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-muted-foreground">Contact Email 2 (optional)</label>
                    <Input
                      type="email"
                      value={contactEmail2}
                      onChange={(e) => setContactEmail2(e.target.value)}
                      placeholder="finance@client.com"
                      className="mt-1 bg-background"
                    />
                  </div>

                  <div className="pt-2 border-t border-border">
                    <label className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-foreground">Send monthly statements</div>
                        <div className="text-xs text-muted-foreground">Automatic monthly statement for this client</div>
                      </div>
                      <Switch checked={sendStatements} onCheckedChange={setSendStatements} />
                    </label>
                    {sendStatements && (
                      <div className="mt-2">
                        <label className="text-xs text-muted-foreground">Day of month</label>
                        <Select value={statementDay} onValueChange={setStatementDay}>
                          <SelectTrigger className="w-full mt-1 bg-background">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-border">
                            <SelectItem value="1">1st</SelectItem>
                            <SelectItem value="15">15th</SelectItem>
                            <SelectItem value="last">Last day</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-border">
                    <label className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-foreground">Copy in Invoice Finance Provider</div>
                        <div className="text-xs text-muted-foreground">Send copy to your finance provider</div>
                      </div>
                      <Switch checked={copyFinanceProvider} onCheckedChange={setCopyFinanceProvider} />
                    </label>
                    {copyFinanceProvider && (
                      <div className="mt-2 space-y-2">
                        <Select value={financeProvider} onValueChange={setFinanceProvider}>
                          <SelectTrigger className="w-full bg-background">
                            <SelectValue placeholder="Select provider" />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-border">
                            {financeProviders.map((p) => (
                              <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {financeProvider === "other" && (
                          <Input
                            type="email"
                            value={customProviderEmail}
                            onChange={(e) => setCustomProviderEmail(e.target.value)}
                            placeholder="Provider email address"
                            className="bg-background"
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => setStep(3)}
                    disabled={!contactEmail1}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="text-sm font-medium text-foreground">Review & Send</div>

                {hasExceptions && (
                  <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/30">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-amber-400">Outstanding Exceptions</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          This week has outstanding exceptions that may cause disputes.
                        </div>
                        <label className="flex items-center gap-2 mt-2 cursor-pointer">
                          <Checkbox
                            checked={acknowledgeExceptions}
                            onCheckedChange={(c) => setAcknowledgeExceptions(c === true)}
                          />
                          <span className="text-xs text-foreground">Export anyway (may increase dispute risk)</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-muted/30 rounded-lg p-3 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Client</span>
                    <span className="text-foreground font-medium">{client.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Week ending</span>
                    <span className="text-foreground">{weekEnding}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Invoice total</span>
                    <span className="text-foreground font-medium">${invoiceTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment terms</span>
                    <span className="text-foreground">{paymentTerms} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Recipients</span>
                    <span className="text-foreground text-right text-xs">{contactEmail1}{contactEmail2 && <><br />{contactEmail2}</>}</span>
                  </div>
                  {copyFinanceProvider && financeProvider && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Finance provider</span>
                      <span className="text-foreground">{financeProviders.find(p => p.value === financeProvider)?.label}</span>
                    </div>
                  )}
                </div>

                <div>
                  <div className="text-xs text-muted-foreground mb-2">Included backups</div>
                  <div className="flex flex-wrap gap-1">
                    {includeEventSequence && <span className="text-xs px-2 py-0.5 bg-muted rounded">Event sequence</span>}
                    {includeExceptionExplanations && <span className="text-xs px-2 py-0.5 bg-muted rounded">Exception notes</span>}
                    {includeApprovalSignatures && <span className="text-xs px-2 py-0.5 bg-muted rounded">Approvals</span>}
                    {includeOverrideNotes && hasOverrides && <span className="text-xs px-2 py-0.5 bg-amber-500/20 text-amber-400 rounded">Override notes</span>}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-muted-foreground mb-2">Export method</div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setExportMethod("secure-link")}
                      className={cn(
                        "flex-1 p-3 rounded-lg border text-sm text-left transition-colors",
                        exportMethod === "secure-link"
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/30"
                      )}
                    >
                      <div className="font-medium text-foreground">Secure Link</div>
                      <div className="text-xs text-muted-foreground">Read-only, expires in 14 days</div>
                    </button>
                    <button
                      onClick={() => setExportMethod("email-attachment")}
                      className={cn(
                        "flex-1 p-3 rounded-lg border text-sm text-left transition-colors",
                        exportMethod === "email-attachment"
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/30"
                      )}
                    >
                      <div className="font-medium text-foreground">Email Attachment</div>
                      <div className="text-xs text-muted-foreground">PDF files attached</div>
                    </button>
                  </div>
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={saveAsDefault}
                    onCheckedChange={(c) => setSaveAsDefault(c === true)}
                  />
                  <span className="text-sm text-foreground">Save as client default</span>
                </label>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={handleSend}
                    disabled={hasExceptions && !acknowledgeExceptions}
                  >
                    {exportMethod === "secure-link" ? (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Secure Link
                      </>
                    ) : (
                      <>
                        <Mail className="w-4 h-4 mr-2" />
                        Send via Email
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DemoInvoiceExportModal;
