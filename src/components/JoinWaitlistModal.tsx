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
    successTitle="You're on the list."
    successBody="We'll reach out when your cohort opens."
  />
);

export default JoinWaitlistModal;
