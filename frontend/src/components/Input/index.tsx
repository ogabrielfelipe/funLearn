import { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";
import { Container, Input, Select } from "./styles"

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    title: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>{
    title: string;
    children: ReactNode,
}

function InputFrom( { title, ...rest }:InputProps ){

    return (
        
        <Container>
            <span>{title}</span>
            <Input {...rest} />
        </Container>
        
    )

}

function SelectForm( { title, children, ...rest }: SelectProps ){

    return (        
        <Container>
            <span>{title}</span>
            <Select
                {...rest}
            > 
               {children}
            </Select>
        </Container>
        
    )

}



export { InputFrom, SelectForm }