import { AuthContext } from "../../../contexts/AuthContext";
import { useContext } from "react"
import Router from "next/router";
import { setupAPIClient } from "../../../services/api";

import Link from 'next/link'

import Head from "next/head";
import { HeaderAuth } from "../../../components/Header";

import { Button, Container } from "./styles";


export default function HomeAdministrator(){

    const { user } = useContext(AuthContext)
    
    return (
        <>
            <Head>
                <title>Home Administrador - FunLearn</title>
            </Head>
            <HeaderAuth teacher={false}/>
            <Container>

            </Container>
        </>
    )
}

export const getServerSideProps = async (ctx) => {
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