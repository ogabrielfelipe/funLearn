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
import Countdown from 'react-countdown';


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

type TipAnswer = {
    name: string,
    id: string,
    used?: boolean
}




export default function GameStudent(){
    const apiClient = setupAPIClient();
    const router = useRouter();
    const { positionID } = router.query;

    const [loading, setLoading] = useState(true);
    //const [detailsPosition, setDetailsPosition] = useState<detailsPositionType>();
    const [listAsks, setListAsks] = useState(Array());

    const [firstAsk, setFirstAsk] = useState();

    const [gameID, setGameID] = useState<string>("");
    const [askID, setAskID] = useState<string>("");
    const [askImage, setAskImage] = useState<string>("");
    const [askLevel, setAskLevel] = useState<string>("");
    const [askQuestion, setAskQuestion] = useState<string>("");
    const [askAnswers, setAskAnswers] = useState<AnswersAsk[]>(Array());
    const [askDateVisualized, setAskDateVisualized] = useState<number>("");

    const [themeName, setThemeName] = useState<string>("");
    const [lifePosition, setLifePosition] = useState<Array<number>>(Array());
    const [coinPosition, setCoinPosition] = useState<number>(0);


    const [tip, setTip] = useState<TipAnswer[]>(Array());
    const [tipName, setTipName] = useState<string>("");
    const [countTipUsed, setCountTipUsed] = useState<number>(0);
    
    function handleSelectionFirstAsk( asks: any[] ){
        return asks.find(value => {
            return value.answered === false && !value.timeOut ;
        })
    }

    function populateTips(tips: TipAnswer[]){
        let tipAux: TipAnswer[] = Array();
        tips.map(value => {
            tipAux.push({
                id: value.id,
                name: value.name,
                used: false
            })
        })
        setTip(tipAux)
    }


    async function findDatailsAsk(askID: string, gameID: string){
        setLoading(true);
        await apiClient.get(`/game/find/ask/${askID}/${gameID}`)
        .then(resp => {
            if (resp.status === 200){
                console.log(resp.data)  

                setGameID(gameID);
                setAskID(resp.data.id);
                setAskImage(resp.data.image);
                setAskLevel(resp.data.level);
                setAskQuestion(resp.data.question);
                setAskAnswers(resp.data.answer);
                setAskDateVisualized(Date.parse(resp.data.game[0].dateVisualized));
                populateTips(resp.data.tip);
                setLoading(false);
                return true
            }
        })
        .catch(err => {
            console.log(err)
            setLoading(false);
            return false
        })
    }

    function convertLifeInArray(life: number){
        let aux: Array<number> = Array<number>()
        for (var i = 0; i < setupGame.game.life; i++){
            var value = life - i;
            if (value > 0){
                aux.push(1)
            }else {
                aux.push(0)
            }
        } 

        return aux
    }

    async function findAsksByPositionID(positionID:string) {
        setLoading(true);
        apiClient.get(`/game/find/askByPosition/${positionID}`)
        .then(async resp => {
            setLoading(false);
            console.log(resp.data)
            let askSelected = handleSelectionFirstAsk(resp.data);
            await findDatailsAsk(askSelected.ask.id, askSelected.id)
            return;
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
        })

    }
    async function getPosition(positionID: string, findAsks: boolean){
        setLoading(true);
        apiClient.get(`/game/find/position/${positionID}`)
        .then(async resp => {
            console.log(resp.data)            
            setLifePosition(convertLifeInArray(resp.data.life));
            setCoinPosition(resp.data.score);
            setThemeName(resp.data.theme.name)
            //setDetailsPosition(resp.data); 
            if (findAsks){
                await findAsksByPositionID(positionID)
            }
            setLoading(false);
            return true
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
            return false
        })
    }



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

    function handleShowModelTips(){
        let model = document.getElementById("modelTips");
        let tipFind = tip.filter((value) => {
            if (value.used === false){
                return value
            }
        })[0]

        if (!tipFind){
            setTipName("Essa pergunta não possui mais dicas");            
            model?.classList.add(styles.modelTipsClose)
            return;
        }

        let tipAux = tip.filter(value => {
            return value.id != tipFind.id
        })
        tipFind.used = true;
        tipAux.push(tipFind)
        setTipName(tipFind.name)
        setCountTipUsed(countTipUsed+1);
        model?.classList.add(styles.modelTipsClose)
    }


    function handleCloseModelTips(){
        let model = document.getElementById("modelTips");
        model?.classList.remove(styles.modelTipsClose)
    }


    function handleShowModelTimeOut(){
        console.log("chamei model")

        let model = document.getElementById("modelTimeOut");
        model?.classList.add(styles.modelTimeOutShow)
    }

    function handleCloseModelTimeOut(){
        let model = document.getElementById("modelTimeOut");
        model?.classList.remove(styles.modelTimeOutShow)
    }


    async function handleNewAttempt(gameID: string){
        setLoading(true)
        
        console.log(gameID)
        apiClient.delete(`/game/removeLife/${gameID}`)
        .then(async resp => {
            if (resp.status === 200){

                await getPosition(positionID as string, false)
                await findDatailsAsk(askID, gameID)

                if (resp.data.position.life <= 0){
                    Router.push("/home/student")
                }
                setLoading(false)
                return true
            }
            handleCloseModelTimeOut()
            return false
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
            return false
        })
    }


    const renderer = ({ minutes, seconds, completed }) => {
        if (completed) {
          handleShowModelTimeOut();
          return <span>Tempo Escotado!</span>;
        } else {

          return <span>{minutes}:{seconds}</span>;
        }
      };



    useEffect(() => {  
        getPosition(positionID as string, true )
    }, [positionID])

    return (
        <>
            <Head>
                <title>{themeName} - FunLearn</title>
            </Head>

            <header className={styles.header}>
                <div className={styles.contentGame}>
                    <div className={styles.life}>
                        {
                            lifePosition.map((life, index) => {
                                return (
                                    <>
                                        <LottieFilesLife key={index}
                                            removeLife={life === 1 ? false : true}
                                        />
                                    </>                                    
                                )
                            })
                        }
                    </div>

                    <div className={styles.contentCoin}>
                        <Coin/>
                        <strong className={styles.textCoin}>
                            {coinPosition}
                        </strong>
                    </div>

                </div>

                {/* Configurar para quando clicar, ele finalizar o QUIZZ e redirecionar para a tela inicial do módulo do estudante */}
                <ButtonStudenTertiary>
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
                        
                        {askImage != "" && (
                            <div className={styles.contentImageAsk}>
                                <Image 
                                    src={`http://localhost:3333/ask/image/${askImage}`}
                                    alt={`Imagem referente a pergunta: ${askQuestion}`}
                                    width={1000}
                                    height={400}
                                />
                            </div>
                        )}
                        
                    </div>

                    <div className={styles.containerAnswTip}>                        
                        <div className={styles.contentGame}>
                            <strong className={styles.textTimeAndTip}>
                                <Time />
                                <Countdown
                                    date={askDateVisualized + setupGame.game.timeOut}
                                    renderer={renderer}
                                    autoStart
                                />
                            </strong>


                            <strong className={styles.textTimeAndTip} style={{cursor: "pointer"}} onClick={handleShowModelTips}>  
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


                <div className={styles.btnNext}>
                    <ButtonStudentPrimary>
                        Confirmar
                    </ButtonStudentPrimary>
                </div>
                
            </main>


            {loading === true ? (
                <LoadingManager/>
                ) : (
                    <>
                    </>
                )
            }


            <div className={styles.modelTips} id={"modelTips"}> 
                <span className={styles.btnCloseModel} onClick={handleCloseModelTips} >
                    X
                </span>

                <div className={styles.contentModelTips}>
                    <div className={styles.iconLamp}>
                        <Lamp />
                    </div>

                    <p className={styles.nameTip}>
                        {tipName}
                    </p>
                </div>
                
            </div>


            <div className={styles.modelTimeOut} id={"modelTimeOut"}>
                <div className={styles.contentModelTimeOut}>
                    <div className={styles.iconModelTimeOut}>
                        <Time />
                    </div>
                    <div className={styles.textTimeOut}> 
                        <span>Tempo escotado!!!</span>
                    </div>

                    <div className={styles.contentBtn}>
                        <ButtonStudentSecondary>
                            Finalizar
                        </ButtonStudentSecondary>
                        <ButtonStudentPrimary onClick={ () => handleNewAttempt(gameID)}>
                            Tentar Novamente
                        </ButtonStudentPrimary>
                    </div>
                </div>
            </div>
        </>
    ) 

}


export const getServerSideProps = canSSRAuth( async (ctx: any) => {

    return {
        props:{}
    }

} )