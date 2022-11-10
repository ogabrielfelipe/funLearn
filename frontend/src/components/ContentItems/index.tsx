import { HTMLAttributes, ReactNode } from "react"
import { Container, Title } from "./styles"

import destaque from "../../../public/assets/DestaqueTitle.svg"
import Image from "next/image";


interface ContentItemsProps extends HTMLAttributes<HTMLDivElement>{
    children: ReactNode;
    title: string
}

function ContentItems( { children, title }: ContentItemsProps ){
    return (
        <Container>
            <Title>
                {title}
                <Image src={destaque} alt={"Imagem de destaque da tela de: "+title}/>
            </Title>
            {children}
        </Container>
    )
}

export { ContentItems }