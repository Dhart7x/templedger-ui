import LeadModal from "@/components/LeadModal";
import symbolUrl from "@/assets/templedger-symbol.png";

interface Props {
  open: boolean;
  onClose: () => void;
}

const demoSuccess = (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    <img
      src={symbolUrl}
      alt=""
      style={{ width: 40, height: 40, display: "block", marginBottom: 24 }}
    />
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
        margin: "22px 0 0",
        fontFamily: "'Inter', system-ui, sans-serif",
        fontSize: 15,
        color: "#55456C",
      }}
    >
      Taking you to scheduling
    </p>
  </div>
);

const BookDemoModal = ({ open, onClose }: Props) => (
  <LeadModal
    open={open}
    onClose={onClose}
    title="Book a demo"
    submitLabel="Book Demo"
    attioSource="Website demo booking"
    attioList="demo"
    redirectUrl="https://calendly.com/m-gadsby/meeting-with-michael-gadsby"
    successTitle=""
    successBody=""
    successExtra={demoSuccess}
    minimalSuccess
  />
);

export default BookDemoModal;
