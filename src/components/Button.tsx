import { FC, ReactElement } from "react";
import styled from "styled-components";

type ButtonProps = {
    icon?: ReactElement;
    dark?: boolean;
};

const UnstyledButton: FC<ButtonProps> = ({
    children,
    dark,
    icon,
    ...props
}) => (
    <button {...props}>
        {icon}
        {children}
    </button>
);

export const Button = styled(UnstyledButton)`
    background-color: ${({ dark }) => (dark ? "#000" : "#fff")};
    border: none;
    border-radius: 32px;
    color: ${({ dark }) => (dark ? "#fff" : "#000")};
    font-family: Roboto;
    font-size: 1rem;
    font-weight: 700;
    line-height: 1rem;
    padding: 14px;
`;
