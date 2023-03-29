import React from "react";
import AlertMui, { AlertColor } from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Container } from "./style";

interface AlertProps {
    type: AlertColor;
    title?: string;
    text: string | React.ReactNode;
    open:boolean;
}

const Alert: React.FC<AlertProps> = (props) => {
    const { type = "info", title, text, open } = props;
    return (
        <Container>
            {open===true && <AlertMui severity={type}>
                <AlertTitle>{title}</AlertTitle>
                {text}
            </AlertMui>}
        </Container>
    );
};

export default Alert;
