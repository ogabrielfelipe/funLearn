import Head from "next/head";
import { ContentItems } from "../../components/ContentItems";
import { HeaderAuth } from "../../components/Header";
import { Container } from "../styles";



export default function Turma(){
    return (
        <>
            <Head>
                <title> Turma - FunLearn </title>
            </Head>
            <HeaderAuth teacher={false}/>
            <Container>
                <ContentItems 
                    title="Visualizar Turmas"
                >
                    
                </ContentItems>
            </Container>
        </>
    )
}