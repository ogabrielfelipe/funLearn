import { canSSRAuth } from "../../../utils/canSSRAuth"
import { AuthContext } from "../../../contexts/AuthContext";
import { useContext } from "react"
import Router from "next/router";
import { api } from "../../../services/apiClient";

import { setupAPIClient } from "../../../services/api";

import Link from 'next/link'

import Head from "next/head";
import { HeaderAuth, HeaderStudent } from "../../../components/Header";

import { Container } from "./styles";
import { ButtonStudenTertiary, ButtonStudentPrimary, ButtonStudentSecondary } from "../../../components/Button";
import { Header } from "../../../components/Header/styles";

export default function HomeStudent(){
    return (
        <>
            <Head>
                <title>Home Student - FunLearn</title>
            </Head>
            <HeaderStudent /> 

            

        </>
    )
}

export const getServerSideProps = async (ctx: any) => {
    const api = setupAPIClient(ctx);
    try{
        const userLog = await api.post('/student/auth/session')
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