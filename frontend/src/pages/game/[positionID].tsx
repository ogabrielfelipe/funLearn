import Head from "next/head";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LoadingManager } from "../../components/Loading";
import { setupAPIClient } from "../../services/api";
import { canSSRAuth } from "../../utils/canSSRAuth";

import Link from "next/link"

import LottieFilesLife from "../../components/LottieFiles/Life";
import Coin  from "../../components/LottieFiles/Coin";
import Lamp  from "../../components/LottieFiles/Lamp";
import Time  from "../../components/LottieFiles/Time";
import { ButtonStudenTertiary, ButtonStudentSecondary, ButtonStudentPrimary } from "../../components/Button";

import styles from './Game.module.css'
import Image from "next/image";
import { env } from "process";

import setupGame from "../../../SetupGame.json"


type detailsPositionType = {
    id: string,
    dateInitial: string,
    dateFinalization:string,
    started: boolean,
    finished: boolean,
    finishedOver: boolean,
    finishedTime: boolean,
    life: number,
    score: number,
    dateRecommence: string,
    dateFinalizationRecommence: string,
    qtdRecommence: number,
    recommence: boolean,
    student: {
      "id": string,
      "name": string
    },
    theme: {
      id: string,
      name: string
    }
  }

type AnswersAsk = {
    description: string,
    id: string
}


export default function GameStudent(){
    const apiClient = setupAPIClient();
    const router = useRouter();
    const { positionID } = router.query;


    const [loading, setLoading] = useState(true);
    const [detailsPosition, setDetailsPosition] = useState<detailsPositionType>();
    const [listAsks, setListAsks] = useState(Array());

    const [firstAsk, setFirstAsk] = useState();

    const [askID, setAskID] = useState<string>("");
    const [askImage, setAskImage] = useState<string>("");
    const [askLevel, setAskLevel] = useState<string>("");
    const [askQuestion, setAskQuestion] = useState<string>("");
    const [askAnswers, setAskAnswers] = useState<AnswersAsk[]>(Array());


    
    function handleSelectionFirstAsk( asks: any[] ){
        return asks.find(value => {
            return value.answered === false;
        })
    }
    async function findDatailsAsk(askID: string){
        setLoading(true);
        await apiClient.get(`/game/find/ask/${askID}`)
        .then(resp => {
            if (resp.status === 200){
                setAskID(resp.data.id);
                setAskImage(resp.data.image);
                setAskLevel(resp.data.level);
                setAskQuestion(resp.data.question);
                setAskAnswers(resp.data.answer);
                setLoading(false);
            }
        })
        .catch(err => {
            console.log(err)
            setLoading(false);
        })
    }

    async function findAsksByPositionID(positionID:string) {
        setLoading(true);
        await apiClient.get(`/game/find/askByPosition/${positionID}`)
        .then(resp => {
            setLoading(false);
            let askSelected = handleSelectionFirstAsk(resp.data);
            findDatailsAsk(askSelected.ask.id)
            return;
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
        })

    }

    useEffect(() => {        
        async function getPosition(positionID: string){
            setLoading(true);
            await apiClient.get(`/game/find/position/${positionID}`)
            .then(async resp => {
                setDetailsPosition(resp.data);
                
                await findAsksByPositionID(positionID)

                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            })
        }

        getPosition(positionID as string)

    }, [positionID])


    async function selectAnswer(answerID: string){
        console.log(answerID);

        askAnswers.forEach(value => {
            var answerSelected = document.getElementById(`${value.id}`);
            answerSelected?.classList.remove(styles.contentAnswerSelected)

        })

        let answerSelected = document.getElementById(`${answerID}`);
        answerSelected?.classList.toggle(styles.contentAnswerSelected)
        console.log(answerSelected);
    }

    // function showLife(life: number){
    //     let listAux = [1,1,1]
    //     for (var i = 0; i < setupGame.game.life; i++){
    //         var x = life - i;
    //         if (x > 0){
    //             listAux[i] = 1;
    //         }else{
    //             listAux[i] = 0;
    //         }
    //     }

    //     return (
    //         listAux.map(value => {
    //             console.log(value)
    //             return (
    //                 <>
    //                     <LottieFilesLife 
    //                         removeLife={value === 1 ? true : false}
    //                     />
    //                 </>
    //             )
    //         })
    //     )
    // }


    return (
        <>
            <Head>
                <title>{detailsPosition?.theme.name} - FunLearn</title>
            </Head>

            <header className={styles.header}>
                <div className={styles.contentGame}>
                    <div className={styles.life}>
                        {
                            detailsPosition?.life === 3 ? (
                                <>
                                    <LottieFilesLife 
                                    removeLife={false}
                                    />

                                    <LottieFilesLife 
                                        removeLife={false}
                                    />

                                    <LottieFilesLife 
                                        removeLife={false}
                                    />
                                </>
                                
                            ) : detailsPosition?.life === 2 ? (
                                <>
                                    <LottieFilesLife 
                                    removeLife={false}
                                    />

                                    <LottieFilesLife 
                                        removeLife={false}
                                    />

                                    <LottieFilesLife 
                                        removeLife={true}
                                    />
                                </>
                            ) : detailsPosition?.life === 1 ? (
                                <>
                                    <LottieFilesLife 
                                    removeLife={false}
                                    />

                                    <LottieFilesLife 
                                        removeLife={true}
                                    />

                                    <LottieFilesLife 
                                        removeLife={true}
                                    />
                                </>
                            ) : <></>
                        }
                    </div>

                    <div className={styles.contentCoin}>
                        <Coin/>
                        <strong className={styles.textCoin}>
                            {detailsPosition?.score}
                        </strong>
                    </div>

                </div>

                {/* Configurar para quando clicar, ele finalizar o QUIZZ e redirecionar para a tela inicial do módulo do estudante */}
                <ButtonStudenTertiary onClick={() => console.log(firstAsk)}>
                    <Link href="#">
                        Tela Inicial
                    </Link>
                </ButtonStudenTertiary>

            </header>

            <main> 
                <div className={styles.container}>
                    <div className={styles.containerAsk}>
                        <strong className={styles.strongQuestion}>
                            Pergunta:
                        </strong>
                        <span className={styles.question}>
                            {askQuestion}
                        </span>
                        
                        <div className={styles.contentImageAsk}>
                            <Image 
                                src={`http://localhost:3333/ask/image/${askImage}`}
                                alt={`Imagem referente a pergunta: ${askQuestion}`}
                                width={1000}
                                height={400}
                            />
                        </div>
                        
                    </div>

                    <div className={styles.containerAnswTip}>                        
                        <div className={styles.contentGame}>
                            <strong className={styles.textTimeAndTip}>
                                <Time />
                                04:59
                            </strong>


                            <strong className={styles.textTimeAndTip}>
                                <Lamp />
                                Dica
                            </strong>
                        </div>

                        <div className={styles.contentAnswerList}>
                            {askAnswers.map((value, index) => {
                                let alpha = ['A', 'B', 'C', 'D']
                                return (
                                    <>
                                        <div key={value.id} onClick={ () => selectAnswer(value.id) } id={value.id} className={styles.contentAnswer}>
                                            <span hidden>{value.id}</span>
                                            <div className={styles.alphaLetters}>
                                                <a href="#" id={`alpha-${value.id}`}>{alpha[index]}</a>
                                            </div>
                                            <div>
                                                <p className={styles.descriptionAns} >
                                                    {value.description}
                                                </p>
                                            </div>
                                        </div>    
                                    </>
                                )
                            })}       
                        </div>
                    </div>

                </div>


                {/* <div className={styles.btnNext}>
                    <ButtonStudentPrimary>
                        Próximo
                    </ButtonStudentPrimary>
                </div> */}
                
            </main>


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


export const getServerSideProps = canSSRAuth( async (ctx: any) => {

    return {
        props:{}
    }

} )