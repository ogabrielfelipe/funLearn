import { useState } from "react";

import { canSSRAuth } from "../../../utils/canSSRAuth"
import { AuthContext } from "../../../contexts/AuthContext";
import { useContext } from "react"
import Router from "next/router";
import { api } from "../../../services/apiClient";

import { setupAPIClient } from "../../../services/api";

import Link from 'next/link'

import Head from "next/head";

import { HeaderAuth } from "../../../components/Header";
import { InputFrom } from "../../../components/Input";
import { ButtonConfirmBlue } from "../../../components/Button";

import { Container, ContainerInput, ContainerIpntBut, Content } from "./styles";


export default function HomeTeacher(){
    const [filterNameTeam, setFilterNameTeam] = useState("")
    const [filterNameTheme, setFilterNameTheme] = useState("")

    return (
        <>
            <Head>
                <title>Home Teacher - FunLearn</title>
            </Head>
            <HeaderAuth teacher={true}/>
            <Container>
                <Content>
                    <ContainerIpntBut>
                        <ContainerInput>
                            <InputFrom 
                                title="Turma:"
                                placeholder="Selecione uma Turma"   
                                value={filterNameTeam}
                                onChange={(e) => setFilterNameTeam(e.target.value)}                             
                            />
                        </ContainerInput>

                        <ContainerInput>
                            <InputFrom 
                                title="Tema:"
                                placeholder="Selecione um Tema"   
                                value={filterNameTheme}
                                onChange={(e) => setFilterNameTheme(e.target.value)}                             
                            />
                        </ContainerInput>

                        <ButtonConfirmBlue type="submit">
                            Pesquisar
                        </ButtonConfirmBlue>
                    </ContainerIpntBut>
                </Content>
            </Container>  
        </>
    )
}

export const getServerSideProps = async (ctx: any) => {
    const api = setupAPIClient(ctx);
    try{
        const userLog = await api.post('/teacher/auth/session')
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