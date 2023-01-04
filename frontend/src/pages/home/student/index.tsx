import { canSSRAuth } from "../../../utils/canSSRAuth"
import { AuthContext } from "../../../contexts/AuthContext";
import { useContext } from "react"
import Router from "next/router";
import { api } from "../../../services/apiClient";

import { setupAPIClient } from "../../../services/api";

import Link from 'next/link'

import Head from "next/head";
import Image from "next/image";
import { HeaderStudent } from "../../../components/Header";

import { Container, Content, ContentLottie, TitleTheme, DescriptionTheme, SideBar, BtnSideBar, Classification } from "./styles";
import { ButtonStudenTertiary, ButtonStudentPrimary, ButtonStudentSecondary } from "../../../components/Button";

import { AnimationTheme1 } from "../../../components/LottieFiles/ModuleStudent";
import Carousel from "nuka-carousel/lib/carousel";
import { CaretLeft, CaretRight } from "phosphor-react";

export default function HomeStudent(){
    
    return (
        <>
            <Head>
                <title>Home Student - FunLearn</title>
            </Head>
            <HeaderStudent /> 

            <SideBar>
                <BtnSideBar>
                    teste
                </BtnSideBar>
                <Classification>

                </Classification>
            </SideBar>

            <Container>
                <Carousel
                    autoplay={false}
                    animation={"fade"}
                    wrapAround={true}
                    withoutControls={false}
                    speed={2000}
                    defaultControlsConfig={{
                        pagingDotsStyle: {
                            opacity: 0,
                          },
                        nextButtonText: <CaretRight size={45} color={"#000000"} />,
                        prevButtonText: <CaretLeft size={45} color={"#000000"} />,
                        prevButtonStyle: {
                          backgroundColor: "transparent",
                          opacity: 0.7,
                        },
                        nextButtonStyle: {
                          backgroundColor: "transparent",
                          opacity: 0.7,
                        },
                      }}
                >
                    <Content>
                        <TitleTheme>Tema do QUIZZ 1</TitleTheme>
                        <ContentLottie>
                            <AnimationTheme1 />
                        </ContentLottie>
                            
                        <DescriptionTheme> Descrição do tema </DescriptionTheme>
                        
                        <ButtonStudentPrimary>
                            Começar
                        </ButtonStudentPrimary>
                    </Content>       
                    

                    <Content>
                        <TitleTheme>Tema do QUIZZ 2</TitleTheme>
                        <ContentLottie>
                            <AnimationTheme1 />
                        </ContentLottie>
                            
                        <DescriptionTheme> Descrição do tema </DescriptionTheme>
                        
                        <ButtonStudentPrimary>
                            Começar
                        </ButtonStudentPrimary>
                    </Content>     
                </Carousel>



                                
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