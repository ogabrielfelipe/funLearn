import { AuthContext } from "../../../contexts/AuthContext";
import { useContext, useEffect } from "react"
import Router from "next/router";
import { setupAPIClient } from "../../../services/api";

import Link from 'next/link'

import Head from "next/head";
import { HeaderAuth } from "../../../components/Header";

import { Container, Content } from "./styles";


export default function HomeAdministrator(){

    return (
        <>
            <Head>
                <title>Home Administrador - FunLearn</title>
            </Head>
            <HeaderAuth/>
            <Container>
                <Content> 
                    <strong> Total de Perguntas Cadastradas </strong>
                    <span>00</span>
                </Content>

                <Content> 
                    <strong> Total de Professores Cadastrados </strong>
                    <span>00</span>
                </Content>

                <Content> 
                    <strong> Total de Alunos Cadastrados </strong>
                    <span>00</span>
                </Content>

                <Content> 
                    <strong> Total de Turmas Cadastradas </strong>
                    <span>00</span>
                </Content>

                <Content> 
                    <strong> Total de Administradores Cadastradas </strong>
                    <span>00</span>
                </Content>
                

            </Container>
        </>
    )
}

export const getServerSideProps = async (ctx: any) => {
    const api = setupAPIClient(ctx);
    try{
        const userLog = await api.post('/administrator/auth/session')
        if (userLog.status === 200){
            return{
                props:{
                    userLog: userLog.data
                }
            }
        }else{  
            return{
                redirect: {
                    destination: "/",
                    permanent: false
                }
            }
        }
    }catch(error){
        return{
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }
    
}