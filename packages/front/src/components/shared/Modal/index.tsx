import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ModalMui from "@mui/material/Modal";

interface ModalProps {
    children: string | React.ReactNode;
    title?: string;
    open: boolean;
    handleClose?(): void;
    buttonClose?: boolean;
    styleContainer?: React.CSSProperties;
    styleContent?: React.CSSProperties;
}

const Modal: React.FC<ModalProps> = ({ title, open, handleClose, children, styleContainer, styleContent }) => {
    return (
        <ModalMui
            className="Modal"
            disableEscapeKeyDown
            style={styleContainer}
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Dialog className="ModalDialog" open={open} onClose={handleClose} scroll="paper">
                <DialogTitle>{title}</DialogTitle>
                <DialogContent style={styleContent}>{children}</DialogContent>
                {/* <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleClose}>Subscribe</Button>
                    </DialogActions> */}
            </Dialog>
        </ModalMui>
    );
};

export default Modal;
