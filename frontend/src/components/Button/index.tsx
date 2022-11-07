import { ButtonHTMLAttributes, ReactNode } from "react";
import { Button } from "./styles";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    children: ReactNode,
}

function ButtonConfirm( { children, ...rest }:ButtonProps ){
    return (
        <Button {...rest}>
            {children}
        </Button>
    )
}

export { ButtonConfirm }