import { canSSRAuth } from "../../../utils/canSSRAuth"
import { AuthContext } from "../../../contexts/AuthContext";
import { useContext } from "react"
import Router from "next/router";
import { api } from "../../../services/apiClient";

import { setupAPIClient } from "../../../services/api";

import Link from 'next/link'

import Head from "next/head";
import Image from "next/image";
import { HeaderAuth, HeaderStudent } from "../../../components/Header";

import { Container } from "./styles";
import { ButtonStudenTertiary, ButtonStudentPrimary, ButtonStudentSecondary } from "../../../components/Button";
import { Header } from "../../../components/Header/styles";

import { ButtonConfirmBlue } from "../../../components/Button";

import TemaDoQuizz from "../../../../public/assets/Tema do Quizz.svg";
import Frame from "../../../../public/assets/Frame.svg";
import CaretLeft from "../../../../public/assets/CaretLeft.svg";
import CaretRight from "../../../../public/assets/CaretRight.svg";
import Description from "../../../../public/assets/Descrição.svg";
import ArrowCounterClockwise from "../../../../public/assets/ArrowCounterClockwise.svg";

export default function HomeStudent(){
    return (
        <>
            <Head>
                <title>Home Student - FunLearn</title>
            </Head>
            <HeaderStudent /> 

            <Container>
                <Image src={TemaDoQuizz} layout="responsive"  alt={"Tema do Quizz."}/>
                {/* <strong> TEMA DO QUIZZ</strong> */}

                <Image src={Frame} layout="responsive"  alt={"Frame do Quizz."}/>

                <Image src={CaretLeft} layout="responsive" />

                <Image src={CaretRight} layout="responsive"  />

                <Image src={Description} layout="responsive"  />
                {/* <strong>Descrição do que é o quizz a ser respondido</strong> */}

                <ButtonConfirmBlue type="submit">
                    Começar
                </ButtonConfirmBlue>

                <Image src={ArrowCounterClockwise} layout="responsive"/>
            </Container>
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