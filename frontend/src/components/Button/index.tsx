import { ButtonHTMLAttributes, ReactNode } from "react";
import { Button, ButtonP, ButtonST, ButtonSSB, ButtonSS } from "./styles";

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

function ButtonStudenTertiary( { children, ...rest }:ButtonProps){
    return (

        <ButtonST {...rest}>
            {children}
        </ButtonST>
    )
}

function ButtonStudentPrimary( { children, ...rest }:ButtonProps){
    return (
        
        <ButtonSSB {...rest}>
            {children}
        </ButtonSSB>
    )
}

function ButtonStudentSecondary( { children, ...rest }:ButtonProps ){
    return (
        
        <ButtonSS {...rest}>
            {children}
        </ButtonSS>
    )
}

export { ButtonConfirmBlue, ButtonConfirmPink, ButtonStudenTertiary, ButtonStudentPrimary, ButtonStudentSecondary }