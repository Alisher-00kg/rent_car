import { Box, Modal, styled } from "@mui/material";

export const BaseModal = ({ children, open, onClose, ...props }) => {
  return (
    <Modal open={open} onClose={onClose} {...props}>
      <Content>{children}</Content>
    </Modal>
  );
};

const Content = styled(Box)(() => ({
  maxWidth: "600px",
  position: "absolute",
  top: "50%",
  left: "50%",
  padding: "20px  30px",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#ffffff",
  color: "#222",
  borderRadius: "4px",
  outline: "none",
}));
