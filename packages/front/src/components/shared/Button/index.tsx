import React from "react";
import { Container, Content, Icon, Text } from "./styles";

interface ButtonProps {
    id?:string;
    children: React.ReactNode|String;
    icon?: React.ReactNode|string;
    onClick?():void;
    disabled?:boolean
}
const Button: React.FC<ButtonProps> = ({id, children, icon,  onClick, disabled }) => {
    return (
        <Container id={id}  className="Button" onClick={onClick}>
            <Content disabled={disabled}>
                {icon && <Icon>{icon}</Icon>} <Text className="BtnText" disabled={disabled}>{children}</Text>
            </Content>
        </Container>
    );
};

export default Button;
