import { BaseModal } from "./BaseModal";

export const EditUserModal = ({ open, onClose, user }) => {
  return (
    <BaseModal open={open} onClose={onClose}>
      {user.firstName}
    </BaseModal>
  );
};
