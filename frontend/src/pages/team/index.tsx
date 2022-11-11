import Head from "next/head";
import { ButtonConfirmBlue } from "../../components/Button";
import { ContentItems } from "../../components/ContentItems";
import { InputFrom } from "../../components/Input";
import { HeaderAuth } from "../../components/Header";
import { Container } from "../styles";
import { ContainerInput, ContainerIpntBut, ContainerList, Content } from "./styles";
import { ListView } from "../../components/ListView";
import Router from "next/router";



export default function Turma(){

    const names = [
        {
            id: "123123123123123",
            name1: "Teste name1",
            name2: "Teste name2",
        },
        {
            id: "123123123123123",
            name1: "Teste name1",
            name2: "Teste name2",
        },
        {
            id: "123123123123123",
            name1: "Teste name1",
            name2: "Teste name2",
        },
        {
            id: "123123123123123",
            name1: "Teste name1",
            name2: "Teste name2",
        },
        {
            id: "123123123123123",
            name1: "Teste name1",
            name2: "Teste name2",
        }
    ]

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
                    <Content>
                        <ButtonConfirmBlue onClick={() => { Router.push("/team/add") }}>
                            Novo
                        </ButtonConfirmBlue>

                        <ContainerIpntBut>
                            <ContainerInput>
                                <InputFrom 
                                    title="Pesquisar pelo nome do Aluno:"
                                    placeholder="Nome do Aluno"                                
                                />
                            </ContainerInput>

                            <ButtonConfirmBlue>
                                Pesquisar
                            </ButtonConfirmBlue>
                        </ContainerIpntBut>
                    </Content>

                    <ContainerList>
                        <ListView 
                            names={names}
                        />
                            
                    </ContainerList>
                    
                </ContentItems>
            </Container>
        </>
    )
}