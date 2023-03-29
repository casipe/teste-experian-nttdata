import React from "react";
import Modal from "../shared/Modal";
import Button from "../shared/Button";
import { ContainerAction, Content } from "./style";

interface ModalConfirmProps {
    title?: string;
    renderContent: string | React.ReactNode;
    open: boolean;
    buttonClose?: boolean;
    onClose(): void;
    onConfirmYes?(): void;
    onConfirmYesText?: string | React.ReactNode;
    onConfirmYesDisabled?: boolean;
    onConfirmNo?(): void;
    onConfirmNoTetx?: string | React.ReactNode;
    onConfirmNoDisabled?: boolean;
    width?: string | number;
}

const ModalConfirm: React.FC<ModalConfirmProps> = (props) => {
    const {
        title,
        renderContent,
        open,
        onClose,
        onConfirmYes,
        onConfirmYesText = "Sim",
        onConfirmNo,
        onConfirmNoTetx = "Não",
        width = 400,
        onConfirmYesDisabled = false,
        onConfirmNoDisabled = false,
        buttonClose = true,
    } = props;
    return (
        <Modal styleContent={{ width }} title={title} open={open} handleClose={onClose} buttonClose={buttonClose}>
            <Content>{renderContent}</Content>
            <ContainerAction className="Action">
                {onConfirmNo && <Button id="btnNo" disabled={onConfirmNoDisabled} onClick={onConfirmNo}>{onConfirmNoTetx}</Button>}
                {onConfirmYes && (
                    <Button id="btnYes" disabled={onConfirmYesDisabled} onClick={onConfirmYes}>
                        {onConfirmYesText}
                    </Button>
                )}
            </ContainerAction>
        </Modal>
    );
};

export default ModalConfirm;
