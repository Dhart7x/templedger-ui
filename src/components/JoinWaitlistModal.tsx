import LeadModal from "@/components/LeadModal";

interface Props {
  open: boolean;
  onClose: () => void;
}

const JoinWaitlistModal = ({ open, onClose }: Props) => (
  <LeadModal
    open={open}
    onClose={onClose}
    title="Join the waitlist"
    submitLabel="Join Waitlist"
    attioSource="Website waitlist"
    successTitle="You're on the list."
    successBody="Thank you for your interest in TempLedger. You'll hear from us as early access opens."
  />
);

export default JoinWaitlistModal;
