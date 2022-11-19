import { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes, useState } from "react";
import { Container, ContainerPass, Input, Select, TextArea } from "./styles"

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    title: string;
}
interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{
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
            <Input 
                {...rest} 
            />
        </Container>
        
    )

}

function InputTextArea({ title, ...rest }:TextAreaProps){

    return (        
        <Container>
            <span>{title}</span>
            <TextArea 
                {...rest} 
            />
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



export { InputFrom, SelectForm, InputTextArea }