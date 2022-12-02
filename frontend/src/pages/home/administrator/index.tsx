import { AuthContext } from "../../../contexts/AuthContext";
import { useContext, useEffect, useState } from "react"
import Router from "next/router";
import { setupAPIClient } from "../../../services/api";

import Link from 'next/link'

import Head from "next/head";
import { HeaderAuth } from "../../../components/Header";

import { Container, Content } from "./styles";
import { LoadingManager } from "../../../components/Loading";


export default function HomeAdministrator(){
    const apiClient = setupAPIClient();
    const [loading, setLoading] = useState(true);

    const [countAsks, setCountAsks] = useState('00');
    const [countTeachers, setCountTeachers] = useState('00');
    const [countStudents, setCountStudents] = useState('00');
    const [countTeams, setCountTeams] = useState('00');
    const [countThemes, setCountThemes] = useState('00');
    const [countAdministrators, setCountAdministrators] = useState('00');

    useEffect(() => {

        function addZeroes(num: number, len: number) {
            var numberWithZeroes = String(num);
          var counter = numberWithZeroes.length;
              
          while(counter < len) {
          
              numberWithZeroes = "0" + numberWithZeroes;
            
            counter++;
          
            }
          
          return numberWithZeroes;
        }

        async function getTotals() {
            setLoading(true)
            await apiClient.get('/administrator/countItems')
            .then(res => {
                console.log(res.data);
                setCountAsks(addZeroes(Number(res.data[0].count_asks), 2));
                setCountThemes(addZeroes(Number(res.data[0].count_themes), 2));
                setCountTeachers(addZeroes(Number(res.data[0].count_teachers), 2));
                setCountStudents(addZeroes(Number(res.data[0].count_students), 2));
                setCountTeams(addZeroes(Number(res.data[0].count_teams), 2));
                setCountAdministrators(addZeroes(Number(res.data[0].count_administrators), 2));
                setLoading(false)
            })
            .catch(err => {
                console.log(err);
                setLoading(false)
            })
        }

        getTotals();

    }, [])

    return (
        <>
            <Head>
                <title>Home Administrador - FunLearn</title>
            </Head>
            <HeaderAuth/>
            <Container>
                <Content> 
                    <strong> Total de Perguntas Cadastradas </strong>
                    <span>{countAsks}</span>
                </Content>

                <Content> 
                    <strong> Total de Temas Cadastrados </strong>
                    <span>{countThemes}</span>
                </Content>

                <Content> 
                    <strong> Total de Professores Cadastrados </strong>
                    <span>{countTeachers}</span>
                </Content>

                <Content> 
                    <strong> Total de Alunos Cadastrados </strong>
                    <span>{countStudents}</span>
                </Content>

                <Content> 
                    <strong> Total de Turmas Cadastradas </strong>
                    <span>{countTeams}</span>
                </Content>

                <Content> 
                    <strong> Total de Administradores Cadastrados </strong>
                    <span>{countAdministrators}</span>
                </Content>
                

            </Container>

            {loading === true ? (
                <LoadingManager/>
                ) : (
                    <>
                    </>
                )}
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