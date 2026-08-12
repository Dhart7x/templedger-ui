import LeadModal from "@/components/LeadModal";

interface Props {
  open: boolean;
  onClose: () => void;
}

const spinner = (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 22 }}>
    <div
      style={{
        width: 28,
        height: 28,
        borderRadius: "50%",
        border: `2px solid ${"#E4DFF5"}`,
        borderTopColor: "#4C1D95",
        animation: "tl-spin 1s linear infinite",
      }}
    />
    <style>{`@keyframes tl-spin { to { transform: rotate(360deg); } }`}</style>
    <p
      style={{
        margin: "12px 0 0",
        fontFamily: "'Inter', system-ui, sans-serif",
        fontSize: 13,
        color: "#55456C",
      }}
    >
      Taking you to scheduling...
    </p>
  </div>
);

const BookDemoModal = ({ open, onClose }: Props) => (
  <LeadModal
    open={open}
    onClose={onClose}
    title="Book a demo"
    submitLabel="Book Demo"
    successTitle="You're in."
    successBody="Thank you for booking a demo with TempLedger."
    successExtra={spinner}
  />
);

export default BookDemoModal;
