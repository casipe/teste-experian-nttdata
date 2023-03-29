import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import ContainerMui from "@mui/material/Container";
import { Container } from "./style";

interface ContainerWrapProps {
    children: React.ReactNode;
}
const ContainerWrap: React.FC<ContainerWrapProps> = ({ children }) => {
    return (
        <Container>
            {" "}
            <CssBaseline />
            <ContainerMui maxWidth="lg">{children}</ContainerMui>
        </Container>
    );
};

export default ContainerWrap;
