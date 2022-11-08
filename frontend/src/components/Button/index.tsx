import { ButtonHTMLAttributes, ReactNode } from "react";
import { Button, ButtonP } from "./styles";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    children: ReactNode,
}

function ButtonConfirmBlue( { children, ...rest }:ButtonProps ){
    return (
        <Button {...rest}>
            {children}
        </Button>
    )
}

function ButtonConfirmPink( { children, ...rest }:ButtonProps ){
    return (
        <ButtonP {...rest}>
            {children}
        </ButtonP>
    )
}

export { ButtonConfirmBlue, ButtonConfirmPink }