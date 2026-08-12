import LeadModal from "@/components/LeadModal";

interface Props {
  open: boolean;
  onClose: () => void;
}

const BookDemoModal = ({ open, onClose }: Props) => (
  <LeadModal
    open={open}
    onClose={onClose}
    title="Book a demo"
    submitLabel="Book Demo"
    successTitle="You're in."
    successBody="We'll be in touch within one business day to schedule."
  />
);

export default BookDemoModal;
