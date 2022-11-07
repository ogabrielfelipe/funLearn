import { InputHTMLAttributes } from "react";
import { Container, Input } from "./styles"

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    title: string;
}

function InputFrom( { title, ...rest }:InputProps ){

    return (
        
        <Container>
            <span>{title}</span>
            <Input {...rest} />
        </Container>
        
    )

}

export { InputFrom }