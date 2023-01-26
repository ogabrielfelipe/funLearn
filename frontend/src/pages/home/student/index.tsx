import { canSSRAuth } from "../../../utils/canSSRAuth"
import { AuthContext } from "../../../contexts/AuthContext";
import { useState, useContext, useEffect } from "react";
import { parseCookies } from 'nookies'

import { setupAPIClient } from "../../../services/api";

import Head from "next/head";
import Image from "next/image";

import { HeaderStudent } from "../../../components/Header";

import { Container, Content, ContentLottie, TitleTheme, DescriptionTheme} from "./styles";
import styles from  "./StudentHome.module.css"

import { ButtonStudentPrimary, ButtonStudentSecondary } from "../../../components/Button";

import { AnimationTheme1, AnimationTheme2, AnimationTheme3 } from "../../../components/LottieFiles/ModuleStudent";
import Carousel from "nuka-carousel/lib/carousel";
import { CaretCircleLeft, CaretCircleRight, CaretDoubleRight, CaretLeft, CaretRight } from "phosphor-react";

import FirstPosition from "../../../../public/assets/firstPosition.svg"
import SecondPosition from "../../../../public/assets/SecondPosition.svg"
import ThirdPosition from "../../../../public/assets/ThirdPosition.svg"
import Router from "next/router";
import { LoadingManager } from "../../../components/Loading";
import LottieFilesCompleteTheme from "../../../components/LottieFiles/CompleteTheme";
import LottieFilesCoin from "../../../components/LottieFiles/CoinSmall";
import LottieFilesLamp from "../../../components/LottieFiles/LampSmall";
import LottieFilesLife from "../../../components/LottieFiles/LifeSmall";
import LottieFilesTime from "../../../components/LottieFiles/TimeSmall";
import LottieFilesCompleteThemeSmall from "../../../components/LottieFiles/CompleteThemeSmall";


import ConfigGame from '../../../../../Backend/configGame.json';

interface HomeStudentProps {
    userLog: {
        id: string;
    }
}


export default function HomeStudent(){
    const apiClient = setupAPIClient();
    const [loading, setLoading] = useState(true);
    const cookies = parseCookies();
    let sidebarObj;

    function openClassification(){
        sidebarObj.classList.toggle(styles.moveClassification);

        const sidebarElements = document.getElementById("sidebarElement");
        sidebarElements?.classList.toggle(styles.elementsHidden)

        const iconBtnClassification = document.getElementById("iconBtnClassification");
        iconBtnClassification?.classList.toggle(styles.btnClassificationRotateShow)

        const textBtnClassification = document.getElementById("textBtnClassification");
        textBtnClassification?.classList.toggle(styles.textBtnClassification)


        const btnClassification = document.getElementById("btnClassification");
        btnClassification?.classList.toggle(styles.btnClassificationShow)
    }


    let sideBarInfo;
    function closeInfoGame(){
        sideBarInfo.classList.toggle(styles.contentInfoGameClose);


        const btnInfoGame = document.getElementById("btnInfoGame");
        btnInfoGame?.classList.toggle(styles.btnInfoGameClose)

        const iconBtnInfoGame = document.getElementById("iconBtnInfoGame");
        iconBtnInfoGame?.classList.toggle(styles.btnContentInfoGameRotateClose)
        
        
    }



    const [themes, setThemes] = useState(Array());
    const [classification, setClassification] = useState(Array());
    useEffect(() => {
        async function getThemesAndClassification(){
            setLoading(true);
            await apiClient.get('/game/find/themes')
            .then(async resp => {
                setThemes(resp.data);
                console.log(resp.data)
                await apiClient.get(`/game/find/classification/${resp.data[0].team.id}`)
                .then(resp2 => {
                    setClassification(resp2.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err)
                    setLoading(false);
                })


                setLoading(false);
            })
            .catch(err => {
                console.log(err)
                setLoading(false);
            })
        }

        

        getThemesAndClassification();   


    }, [])


    async function handleStartGame(themeID: string){
        const studentID: string = cookies['@nextauth.user'];

        setLoading(true);
        await apiClient.post('/game/start', {
            themeID: themeID,
            studentID: studentID
        })
        .then(resp => {
            if (resp.status === 200) {
                setLoading(false);
                Router.push(`/game/${resp.data.initialDatas.id}`)
            }
            setLoading(false);
        })  
        .catch(err => {
            console.log(err);
            setLoading(false);
        })


    }
    async function handleRecommenceGame(positionID: string){

        setLoading(true);
        await apiClient.put(`game/recommence/start/${positionID}`)
        .then(resp => {
            if (resp.status === 200) {
                setLoading(false);
                Router.push(`/game/${resp.data.id}`)
            
                let localStorageCountDown = localStorage.getItem('timeRemaining')
                if (localStorageCountDown){
                    if (JSON.parse(localStorageCountDown).positionID === positionID){
                        localStorage.removeItem('timeRemaining')
                    }
                }
            }
            setLoading(false);
        })  
        .catch(err => {
            console.log(err);
            setLoading(false);
        })

    }


    return (
        <>
            <Head>
                <title>Home Student - FunLearn</title>
            </Head>
            <HeaderStudent /> 

            <div ref={Sidebar => sidebarObj = Sidebar} className={styles.contentClassification} >
                <button className={styles.btnClassification}  onClick={openClassification} id="btnClassification">
                    <CaretCircleRight size={32} className={styles.btnClassificationRotate} id="iconBtnClassification" />
                    <span id="textBtnClassification" className={styles.contentSpanBtnClassification}>
                        Classificação
                        <CaretCircleRight size={32} />
                    </span>
                </button>
                <div id="sidebarElement" className={styles.elements}>

                    <strong className={styles.titleFont} id="titleClassification">
                        Classificação da Turma  
                    </strong>

                    <div className={styles.contentStudents}>
                        { classification.map((value, index) => {
                            return (
                                <div className={styles.positionStudent} key={value.id}>
                                    {index === 0 ? <Image width={32} src={FirstPosition} alt={""} /> : index === 1 ? <Image width={32} src={SecondPosition} alt={""} /> : index === 2 ? <Image width={32} src={ThirdPosition} alt={""} /> :  <span className={styles.contentClass}>{index+1}</span> }
                                    <span style={{fontSize: "1.1rem"}}> {value.nameStudent.split("").length >= 8 ? value.nameStudent.slice(0, 7)+ " ..." : value.nameStudent}</span> <span style={{fontSize: "1.1rem"}}> {value.score}</span>
                                </div>
                            )
                            })
                        }                       
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
                    className={styles.carouselContainer}
                >

                    { themes.map((value, index) => {
                        console.log(value)
                        let position = index+1;
                        position === 4 ? position = 1 : true
                        return (
                            <>    
                                <Content key={value.theme.id}>
                                    <TitleTheme> { value.theme.name } </TitleTheme>
                                    <ContentLottie>
                                        {position === 1 ? (
                                            <AnimationTheme1 />
                                        ) : position === 2 ? (
                                            <AnimationTheme2 />
                                        ) : position === 3 ? (
                                            <AnimationTheme3 />
                                        ) : (
                                            <AnimationTheme1 />
                                        )}
                                    </ContentLottie>
                                        
                                    <DescriptionTheme>{ value.theme.description }</DescriptionTheme>
                                    {value.theme.positions.length === 0 ? (
                                        <ButtonStudentPrimary onClick={() => handleStartGame(value.theme.id)}>
                                            Iniciar
                                        </ButtonStudentPrimary>

                                    ) : (
                                        <>
                                            <div className={styles.contentComplete}>
                                                <LottieFilesCompleteTheme />
                                            </div>


                                            <div className={styles.contentPointTheme}>
                                                <LottieFilesCoin />
                                                {value.theme.positions[0].score}  
                                            </div>

                                            <ButtonStudentSecondary onClick={() => {handleRecommenceGame(value.theme.positions[0].id)}}>
                                                Recomeçar
                                            </ButtonStudentSecondary>

                                        </>

                                    )}
                                </Content>    
                        
                            </>
                        )
                    })
                    }
                       
                    
                </Carousel>                                
            </Container>

            <div ref={Sidebar => sideBarInfo = Sidebar} className={styles.contentInfoGame} >
                <button className={styles.btnInfoGame} onClick={closeInfoGame} id="btnInfoGame">
                    <CaretCircleRight size={32} id="iconBtnInfoGame" />
                    <span id="textBtnInfoGame" className={styles.btnContentInfoGame}>
                        Informações do Jogo
                    </span>
                </button>
    

                <div id="sidebarElement" className={styles.elementsInfoGame}>
                    <div className={styles.titleItemsElement}>
                        <span> Significado dos Ícones</span>
                    </div>
                    <div className={styles.contentItemsElement}>
                        <LottieFilesCoin />
                        <span> Significa a Pontuação total do Tema.</span>
                    </div>
                    <div className={styles.contentItemsElement}>
                        <LottieFilesLamp />
                        <span>Significa as dicas relacionadas á aquela pergunta.</span>
                    </div>
                    <div className={styles.contentItemsElement}>
                        <LottieFilesLife removeLife={false}/>
                        <span>Significa as vidas que você tem naquele Tema.</span>
                    </div>
                    <div className={styles.contentItemsElement}>
                        <LottieFilesLife removeLife={true}/>
                        <span>Significa as vidas que você perdeu naquele Tema.</span>
                    </div>
                    <div className={styles.contentItemsElement}>
                        <LottieFilesTime />
                        <span>Significa o tempo que vocẽ tem para responder aquele Tema.</span>
                    </div>
                    <div className={styles.contentItemsElement}>
                        <LottieFilesCompleteThemeSmall />
                        <span>Significa que você já respondeu aquele Tema.</span>
                    </div>


                    <div className={styles.titleItemsElement}>
                        <span> Informações sobre as Perguntas</span>
                    </div>
                    <div className={styles.contentItemsElement}>
                        <span> 
                            <strong>Iniciante: </strong>
                            Nestas perguntas você poderá testar seus conhecimentos relacionado a introdução do tema propósto pelo seu professor.

                            <br />
                            <br />
                            
                            <div>
                                <strong>Pontução:</strong>
                                <ul>
                                    <li><strong>1ª Tentativa: </strong>500pts</li>
                                    <li><strong>2ª Tentativa: </strong>350pts</li>
                                    <li><strong>3ª Tentativa: </strong>200pts</li>
                                </ul>
                            </div>

                            <br />

                            <div>
                                <strong>Dicas: </strong>
                                Você poderá utilizar quantas dicas quiser, mas tem um porém, 
                                a <strong>CADA</strong> dica utilizada você perderá <strong>15pts.</strong>
                            </div>
                        </span>
                    </div>
                    <div className={styles.contentItemsElement}>
                        <span> 
                            <strong>Intermediário: </strong>
                            Nestas perguntas você poderá testar seus conhecimentos relacionado a introdução do tema propósto pelo seu professor.

                            <br />
                            <br />

                            <div>
                                <strong>Pontução:</strong>
                                <ul>
                                    <li><strong>1ª Tentativa: </strong>750pts</li>
                                    <li><strong>2ª Tentativa: </strong>600pts</li>
                                    <li><strong>3ª Tentativa: </strong>450pts</li>
                                </ul>
                            </div>

                            <br />

                            <div>
                                <strong>Dicas: </strong>
                                Você poderá utilizar quantas dicas quiser, mas tem um porém, 
                                a <strong>CADA</strong> dica utilizada você perderá <strong>25pts.</strong>
                            </div>
                        </span>    
                    </div>
                    <div className={styles.contentItemsElement}>
                        <span> 
                            <strong>Avançado: </strong>
                            Nestas perguntas você poderá testar seus conhecimentos relacionado a introdução do tema propósto pelo seu professor.

                            <br />
                            <br />

                            <div>
                                <strong>Pontução:</strong>
                                <ul>
                                    <li><strong>1ª Tentativa: </strong>1000pts</li>
                                    <li><strong>2ª Tentativa: </strong>850pts</li>
                                    <li><strong>3ª Tentativa: </strong>700pts</li>
                                </ul>
                            </div>

                            <br />
                            
                            <div>
                                <strong>Dicas: </strong>
                                Você poderá utilizar quantas dicas quiser, mas tem um porém, 
                                a <strong>CADA</strong> dica utilizada você perderá <strong>35pts.</strong>
                            </div>
                        </span>
                    </div>

                    <div className={styles.titleItemsElement}>
                        <span> Regras do Jogo</span>
                    </div>
                    <div className={styles.contentItemsElement}>
                        <span> 
                            <strong>Das Vidas: </strong>
                            O Aluno terá 3 vidas para completar o quizz, ao atingir as 3 tentativas irá finalizar o QUIZZ. 
                            Sendo que, a cada vida perdida a pontuação máxima irá diminuir de acordo com o nível da pergunta.
                        </span>
                    </div>
                    <div className={styles.contentItemsElement}>
                        <span> 
                            <strong>Do Tempo: </strong>
                            O Aluno terá um tempo máximo de 5 minutos para terminar o Quizz, se não terminar dentro desse tempo o aluno irá perder uma vida.
                        </span>
                    </div>
                    <div className={styles.contentItemsElement}>
                        <span> 
                            <strong>Das Dicas: </strong>
                            O professor poderá criar dicas para te ajudar a responder o Quizz, se utilizar destas dicas, você irá perder alguns pontos.
                        </span>
                    </div>
                </div>
            </div>


            {loading === true ? (
                <LoadingManager/>
                ) : (
                    <>
                    </>
                )
            }

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