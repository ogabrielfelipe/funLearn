import { canSSRAuth } from "../../../utils/canSSRAuth"
import { AuthContext } from "../../../contexts/AuthContext";
import { useState, useContext } from "react"

import { setupAPIClient } from "../../../services/api";

import Head from "next/head";
import Image from "next/image";

import { HeaderStudent } from "../../../components/Header";

import { Container, Content, ContentLottie, TitleTheme, DescriptionTheme} from "./styles";
import styles from  "./StudentHome.module.css"

import { ButtonStudentPrimary } from "../../../components/Button";

import { AnimationTheme1 } from "../../../components/LottieFiles/ModuleStudent";
import Carousel from "nuka-carousel/lib/carousel";
import { CaretCircleRight, CaretDoubleRight, CaretLeft, CaretRight } from "phosphor-react";

import FirstPosition from "../../../../public/assets/firstPosition.svg"
import SecondPosition from "../../../../public/assets/SecondPosition.svg"
import ThirdPosition from "../../../../public/assets/ThirdPosition.svg"
import Router from "next/router";

export default function HomeStudent(){
    const [hamburguerOpen, setHamburguerOpen] = useState(false);
    let sidebarObj;

    function openClassification(){
        sidebarObj.classList.toggle(styles.moveClassification);

        const sidebarElements = document.getElementById("sidebarElement");
        sidebarElements?.classList.toggle(styles.elementsHidden)

        const iconBtnClassification = document.getElementById("iconBtnClassification");
        iconBtnClassification?.classList.toggle(styles.btnClassificationRotate)

    }

    return (
        <>
            <Head>
                <title>Home Student - FunLearn</title>
            </Head>
            <HeaderStudent /> 

            <div  ref={Sidebar => sidebarObj = Sidebar} className={styles.contentClassification}>
                <button className={styles.btnClassification} onClick={openClassification}>
                    <CaretCircleRight size={32} id="iconBtnClassification" />
                </button>
                <div id="sidebarElement" className={styles.elements}>

                    <strong className={styles.titleFont} id="titleClassification">
                        Classificação da Turma  
                    </strong>

                    <div className={styles.contentStudents}>
                        <div className={styles.positionStudent}>
                            <Image width={32} src={FirstPosition} alt={""} />
                            <span style={{fontSize: "1.1rem"}}>Gabriel F. - 15000</span>
                        </div>
                        <div className={styles.positionStudent}>
                            <Image width={32} src={SecondPosition} alt={""} />
                            <span style={{fontSize: "1.1rem"}}>Gabriel F. - 14999</span>
                        </div>
                        <div className={styles.positionStudent}>
                            <Image width={32} src={ThirdPosition} alt={""} />
                            <span style={{fontSize: "1.1rem"}}>Gabriel F. - 14995</span>
                        </div>
                        <div className={styles.positionStudent}>
                            <span>4</span>
                            <span style={{fontSize: "1.1rem"}}> Gabriel F. - 14995</span>
                        </div>
                    </div>

                </div>

            </div>

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
                        nextButtonText: <CaretRight size={60} color={"#000000"} />,
                        prevButtonText: <CaretLeft size={60} color={"#000000"} />,
                        prevButtonStyle: {
                          backgroundColor: "transparent",
                          opacity: 0.7,
                        },
                        nextButtonStyle: {
                          backgroundColor: "transparent",
                          opacity: 0.7,
                        },
                      }}
                    style={{
                        maxWidth: "50vw"
                    }}
                >
                    <Content>
                        <TitleTheme>Tema do QUIZZ 1</TitleTheme>
                        <ContentLottie>
                            <AnimationTheme1 />
                        </ContentLottie>
                            
                        <DescriptionTheme> Descrição do tema </DescriptionTheme>
                        
                        <ButtonStudentPrimary onClick={() => Router.push("/game")}>
                            Começar
                        </ButtonStudentPrimary>
                    </Content>       
                    

                    <Content>
                        <TitleTheme>Tema do QUIZZ 2</TitleTheme>
                        <ContentLottie>
                            <AnimationTheme1 />
                        </ContentLottie>
                            
                        <DescriptionTheme> Descrição do tema </DescriptionTheme>
                        
                        <ButtonStudentPrimary onClick={() => Router.push("/game")}>
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