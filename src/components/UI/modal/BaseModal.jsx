import { Box, Fade, Modal, styled } from "@mui/material";

export const BaseModal = ({ children, open, onClose, ...props }) => {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
    e.stopPropagation();
    e.nativeEvent?.stopImmediatePropagation();
  };

  return (
    <Modal open={open} onClose={onClose} {...props}>
      <Fade in={open}>
        <BackdropWrapper onClick={handleBackdropClick}>
          <Content>{children}</Content>
        </BackdropWrapper>
      </Fade>
    </Modal>
  );
};

const BackdropWrapper = styled("div")({
  width: "100%",
  height: "100%",
  position: "absolute",
  top: 0,
  left: 0,
});

const Content = styled(Box)(() => ({
  maxWidth: "600px",
  position: "absolute",
  top: "50%",
  left: "50%",
  padding: "20px 30px",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#ffffff",
  color: "#222",
  borderRadius: "4px",
  outline: "none",
}));
