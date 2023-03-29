import React from "react";
import { Container, Content } from "./style";

interface FabBottomProps {
    children?: React.ReactNode;
    onClick?(): void;
    color?: string;
    tooltip?: string;
}

const FabBottom = ({ children, color, onClick, tooltip }: FabBottomProps) => {
    return (
        <Container title={tooltip} onClick={onClick} color={color} isAction={typeof onClick === "function"}>
            {children && <Content>{children}</Content>}
        </Container>
    );
};

export default FabBottom;
