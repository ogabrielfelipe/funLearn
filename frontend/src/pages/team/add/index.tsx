import Head from "next/head";
import { ContentItems } from "../../../components/ContentItems";
import { HeaderAuth } from "../../../components/Header";
import { Container } from "../styles";



export default function AddTeam(){
    return (
        <>
             <Head>
                <title> Cadastro de Turma - FunLearn </title>
            </Head>
            <HeaderAuth teacher={false}/>
            <Container>
                <ContentItems 
                    title="Cadastro de Turmas"
                >


                </ContentItems>
            </Container>
        </>
    )
}