import Head from "next/head";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LoadingManager } from "../../components/Loading";
import { setupAPIClient } from "../../services/api";
import { canSSRAuth } from "../../utils/canSSRAuth";

import LottieFilesLife from "../../components/LottieFiles/Life";
import Coin  from "../../components/LottieFiles/Coin";
import Lamp  from "../../components/LottieFiles/Lamp";
import Time  from "../../components/LottieFiles/Time";
import Life  from "../../components/LottieFiles/Life";
import { ButtonStudenTertiary, ButtonStudentSecondary, ButtonStudentPrimary } from "../../components/Button";

import styles from './Game.module.css'
import Image from "next/image";
import { env } from "process";

import setupGame from "../../../SetupGame.json"
import moment from "moment";

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
    
    const [gameID, setGameID] = useState<string>("");
    const [askID, setAskID] = useState<string>("");
    const [askImage, setAskImage] = useState<string>("");
    const [askQuestion, setAskQuestion] = useState<string>("");
    const [askAnswers, setAskAnswers] = useState<AnswersAsk[]>(Array());
    const [askAttempt, setAskAttempt] = useState<number>(0);
    const [answerSelected, setAnswerSelected] = useState<string>("");


    const [askGeralPoint, setAskGeralPoint] = useState<number>(0);
    const [askLevel, setAskLevel] = useState<string>("");

    const [pointAnswer, setPointAnswer] = useState<number>(0);
    const [descriptionAnswerCorrect, setDescriptionAnswerCorrect] = useState<string>("");

    const [themeName, setThemeName] = useState<string>("");
    const [lifePosition, setLifePosition] = useState<Array<number>>(Array());
    const [coinPosition, setCoinPosition] = useState<number>(0);

    const [tip, setTip] = useState<TipAnswer[]>(Array());
    const [tipName, setTipName] = useState<string>("");
    const [countTipUsed, setCountTipUsed] = useState<number>(0);

    const [pointAsk, setPointAsk] = useState<number>(0);
    const [tipUsedAnswered, setTipUsedAnswered] = useState<number>(0)

    const [numberAsk, setNumberAsk] = useState<string>("");

    const [timeRemainingAsk, setTimeRemainingAsk ] = useState<string>("");

    let oneLifeLater: boolean;

    function handleSelectionFirstAsk( asks: any[] ){
        console.log(asks)

        const verifyAsksAnswered = (x) => x.filter(value => {
            return value.answered === true;
        }).length === x.length;
        
        if (verifyAsksAnswered(asks)){
            handleShowModelYouWin()
        }

        let asksAnswered = (x) => x.filter(value => {
            if (value.answered === true){
                return value;
            }
        }).length;
        setNumberAsk(String(asksAnswered(asks))+"/"+String(asks.length))



        return asks.find(value => {
            return value.answered === false;
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

    async function findDetailsAsk(askID: string, gameID: string, restartTime: boolean){
        setLoading(true);
        await apiClient.get(`/game/find/ask/${askID}/${gameID}`)
        .then(resp => {
            if (resp.status === 200){
                console.log(resp.data)
                setAskAttempt(resp.data.game[0].position.attempt)
                setGameID(gameID);
                setAskID(resp.data.id);
                setAskImage(resp.data.image);
                setAskQuestion(resp.data.question);
                setAskAnswers(resp.data.answer);                
                setAskGeralPoint(resp.data.pointAsk)
                setAskLevel(resp.data.level === "INITIAL"? "Iniciante" : resp.data.level === "ADVANCED"? "Avançada":"Intermediária")

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

        oneLifeLater = aux.filter(value => {
            if (value === 1){
                return value
            }
        }).length === 1;

        return aux
    }

    async function findAsksByPositionID(positionID:string, restartTime: boolean) {
        setLoading(true);
        apiClient.get(`/game/find/askByPosition/${positionID}`)
        .then(async resp => {
            let askSelected = handleSelectionFirstAsk(resp.data);
            await findDetailsAsk(askSelected.ask.id, askSelected.id, restartTime)
            return;
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
        })

    }
    
    async function getPosition(positionID: string, findAsks: boolean, restartTime: boolean){
        setLoading(true);
        apiClient.get(`/game/find/position/${positionID}`)
        .then(async resp => {  
            setLifePosition(convertLifeInArray(resp.data.life));
            setCoinPosition(resp.data.score);
            setThemeName(resp.data.theme.name)
            if (findAsks){
                await findAsksByPositionID(positionID, restartTime)
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
        askAnswers.forEach(value => {
            var answerSelected = document.getElementById(`${value.id}`);
            answerSelected?.classList.remove(styles.contentAnswerSelected)

        })

        let answerSelected = document.getElementById(`${answerID}`);
        answerSelected?.classList.add(styles.contentAnswerSelected)        
        setAnswerSelected(answerID)
    }

    function handleShowModelTips(){
        let model = document.getElementById("modelTips");
        let tipFind = tip.filter((value) => {
            if (value.used === false){
                return value
            }
        })[0]

        if (!tipFind){
            setTipName("Não há Dicas.");            
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
        let modelOpen = document.getElementById("modelTimeOut");
        modelOpen?.classList.add(styles.modelTimeOutShow);
    }

    function handleCloseModelTimeOut(){
        let modelClose = document.getElementById("modelTimeOut");
        modelClose?.classList.remove(styles.modelTimeOutShow);
    }

    function handleShowModelGameOver(){
        let modelOpen = document.getElementById("modelGameOver");
        modelOpen?.classList.add(styles.modelTimeOutShow);


        localStorage.removeItem('timeRemaining');
    }

    function handleShowModelYouWin(){
        let modelOpen = document.getElementById("modelYouWin");
        modelOpen?.classList.add(styles.modelTimeOutShow);
    }

    function handleShowModelAnswerCorrect(){
        let modelOpen = document.getElementById("modelCertain");
        modelOpen?.classList.add(styles.modelTimeOutShow);
    }

    function handleCloseModelAnswerCorrect(){
        let modelOpen = document.getElementById("modelCertain");
        modelOpen?.classList.remove(styles.modelTimeOutShow);
    }

    function handleShowModelAnswerIncorrect(){
        let modelOpen = document.getElementById("modelWrong");
        modelOpen?.classList.add(styles.modelTimeOutShow);
    }

    function handleCloseModelAnswerIncorrect(){
        let modelOpen = document.getElementById("modelWrong");
        modelOpen?.classList.remove(styles.modelTimeOutShow);
    }

    async function handleNewAttempt(){
        setLoading(true)
        console.log(gameID)

        apiClient.delete(`/game/removeLife/${gameID}`)
        .then(async resp => {
            if (resp.status === 200){  
                await getPosition(positionID as string, false, true);
                await findDetailsAsk(askID, gameID, true)  
                localStorage.removeItem('timeRemaining')                
                countDownTimeAsk()                     
                
                if (resp.data.position.life <= 0){
                    handleShowModelGameOver()
                    handleCloseModelTimeOut()
                }else{
                    handleCloseModelTimeOut()
                }
                setLoading(false)
                return true
            }
            return false
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
            return false
        })
    }

    async function handleFinishedGame() {
        setLoading(true);
        let data = {
            positionID: positionID,
            typeFinish: "FINISHED",
        }

        apiClient.delete("/game/finish", {
            data
        })
        .then(resp => {
            Router.push("/home/student")
            setLoading(false);

            localStorage.removeItem('timeRemaining');
        })
        .catch(err => {
            console.error(err);
            setLoading(false);
        })

    }

    async function handleVerifyAnswerSelected() {
        setLoading(true);
        let data ={
            gameID: gameID,
            answerID: answerSelected,
            positionID: positionID,
            attempt: askAttempt,
            tip: countTipUsed
        }


        apiClient.post("/game/answer/check",  data)
        .then(resp => {  
            console.log(resp.data)
            if (resp.data.finishedGame.id){
                setLoading(false);
                handleShowModelGameOver();
                setCountTipUsed(0)
            }else{
                setCountTipUsed(0)
                setLoading(false);
                if (resp.data.isCorrect){
                    setCountTipUsed(0)
                    setPointAsk(resp.data.pointAsk)
                    setTipUsedAnswered(resp.data.changeGameResult.tip)
                    setPointAnswer(resp.data.changeGameResult.point)
                    handleShowModelAnswerCorrect();
                }else{
                    setCountTipUsed(0)
                    setDescriptionAnswerCorrect(resp.data.changeGameResult.ask.answer[0].description)
                    handleShowModelAnswerIncorrect()
                }
            }
        })
        .catch(err => {
            console.error(err);
            setLoading(false);
        })
    }

    function handleFindNewAsk(){
        getPosition(positionID as string, true, true)                   
        askAnswers.forEach(value => {
            var answerSelected = document.getElementById(`${value.id}`);
            answerSelected?.classList.remove(styles.contentAnswerSelected)

        })
    }

    function handleFinishedGameByTime(gameID: string){
        setLoading(true);

        apiClient.delete(`/game/removeLife/${gameID}`)
        .then(async resp => {
            if (resp.status === 200){  
                setLoading(false);
                handleShowModelGameOver()
            }
        })
        .catch(err => {
            setLoading(false);
            console.error(err);
        })            
    }
    
    function countDownTimeAsk(){
        let dateServer = Date.now();

        let timeInLocalStorage = localStorage.getItem('timeRemaining');
        let dateResponseAnswer: number;

        if (timeInLocalStorage){
            let infoCountDownJson = JSON.parse(timeInLocalStorage)
            if (infoCountDownJson.positionID != positionID){
                localStorage.removeItem('timeRemaining')
                dateResponseAnswer = dateServer + setupGame.game.timeOut
            }else{                
                dateResponseAnswer = infoCountDownJson.time
            }
        }else{
            dateResponseAnswer = dateServer + setupGame.game.timeOut
        }
        
        const countDownTime = setInterval( () => {
            const timeRemaining: number = dateResponseAnswer;
            const dateNow =  new Date().getTime();

            const timeRemainingFormatted = new Intl.DateTimeFormat('pt-br', { dateStyle: 'short', timeStyle: 'medium' }).format(timeRemaining)
            const timeNowFormatted = new Intl.DateTimeFormat('pt-br', {dateStyle: 'short', timeStyle: 'medium'}).format(dateNow)
            const diff = moment(timeRemainingFormatted, "DD/MM/YYYY HH:mm:ss").diff(moment(timeNowFormatted, "DD/MM/YYYY HH:mm:ss"), "seconds")
            

            if (diff <= 60){                
                setTimeRemainingAsk(moment.utc(diff * 1000).format('ss[s]'))
            }else {
                setTimeRemainingAsk(moment.utc(diff * 1000).format('mm[m] ss[s]'))
            }
            
            let infoCountDown = {
                "positionID": positionID,
                "time": dateResponseAnswer
            }
            localStorage.setItem('timeRemaining', JSON.stringify(infoCountDown));

            if (diff <= 0){
                clearInterval(countDownTime);  
                if (oneLifeLater){
                    handleFinishedGameByTime(gameID)
                }else{
                    handleShowModelTimeOut();
                }
                return;
            }

        }, 1000)
    }

    useEffect(() => {  
        getPosition(positionID as string, true, true )
        countDownTimeAsk()
    }, [positionID])

    return (
        <>
            <Head>
                <title>{themeName} - FunLearn</title>
            </Head>

            <header className={styles.header}>
                <div className={styles.contentGame}>
                    <div className={styles.contentLifeAndTimeMobile}>
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

                        <strong className={styles.textTimeAndTip}>
                            <Time />
                            {timeRemainingAsk}
                        </strong>
                    </div>
                    

                    <div className={styles.contentCoin}>
                        <Coin/>
                        <strong className={styles.textCoin}>
                            {coinPosition}
                        </strong>
                    </div>

                    <ButtonStudenTertiary onClick={handleFinishedGame}>
                            Tela Inicial
                    </ButtonStudenTertiary>

                </div>

            </header>

            <main> 
                <div className={styles.container}>
                    <div className={styles.containerAsk}>
                        <strong className={styles.strongQuestion}>
                            <span>Pergunta: <span className={styles.contentDetailAsk}>  {parseInt(numberAsk.split("/")[0])+1 > 10 ? 10 : parseInt(numberAsk.split("/")[0])+1} </span></span>
                            <span>Nível: <span className={styles.contentDetailAsk}>{askLevel}</span></span> 
                            <span>Valor: <span className={styles.contentDetailAsk}>{askGeralPoint}</span></span> 
                        </strong>

                        <hr style={{"border": "1px solid #000000"}} />
                        <span className={styles.question}>
                            {askQuestion.split('`')[0]}
                            {askQuestion.split('`')[1] && (
                                <pre className="prettyprint lang-sql" style={{"color": "white", "padding": "0.5rem"}}>
                                    {askQuestion.split('`')[1]}
                                </pre>
                            )}                       
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
                        <div className={styles.contentTipAnswer}>
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
                                        <div key={index} onClick={ () => {selectAnswer(value.id)} } id={value.id} className={styles.contentAnswer}>
                                            <span hidden>{value.id}</span>
                                            <div className={styles.alphaLetters}>
                                                <a href="#" id={`alpha-${value.id}`}>{alpha[index]}</a>
                                            </div>
                                            <div>
                                                <p className={styles.descriptionAns} >
                                                    {value.description.substring(0, 2)[0] == '`' ? (
                                                        <pre className="prettyprint lang-sql" style={{"color": "white", "margin": "-0.5rem"}}>
                                                            {value.description.split("`")}
                                                        </pre>
                                                    ) : (
                                                        <>{value.description}</>
                                                    )}
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
                    <ButtonStudentPrimary onClick={handleVerifyAnswerSelected}>
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
                        <span>Tempo esgotado!!!</span>
                    </div>

                    <div className={styles.contentBtn}>
                        <ButtonStudenTertiary onClick={handleFinishedGame}>
                            Finalizar
                        </ButtonStudenTertiary>
                        <ButtonStudentPrimary onClick={ handleNewAttempt}>
                            Tentar Novamente
                        </ButtonStudentPrimary>
                    </div>
                </div>
            </div>

            <div className={styles.modelTimeOut} id={"modelGameOver"}>
                <div className={styles.contentModelTimeOut}>
                    <div className={styles.iconModelTimeOut}>
                        <Life 
                            removeLife={true}
                        />
                    </div>
                    <div className={styles.textTimeOut}> 
                        <span>Game Over!!!</span>
                    </div>

                    <div className={styles.contentBtn}>
                        <ButtonStudenTertiary onClick={() => {Router.push("/home/student")}}>
                            Tela Inicial
                        </ButtonStudenTertiary>
                    </div>
                </div>
            </div>

            <div className={styles.modelTimeOut} id={"modelYouWin"}>
                <div className={styles.contentModelTimeOut}>
                    <div className={styles.iconModelTimeOut}>
                        <Life 
                            removeLife={true}
                        />
                    </div>
                    <div className={styles.textYouWin}> 
                        <span>Parabéns!!!!!</span>
                        <br />
                        <br />
                        <span>
                            Você completou o quiz e ganhou 
                            <span className={styles.point}> {coinPosition} </span>
                            pontos.
                        </span>
                    </div>

                    <div className={styles.contentBtn}>
                        <ButtonStudenTertiary onClick={() => {Router.push("/home/student")}}>
                            Tela Inicial
                        </ButtonStudenTertiary>
                    </div>
                </div>
            </div>

            <div className={styles.modelTimeOut} id={"modelCertain"}>
                <div className={styles.contentModelTimeOut}>
                    <div className={styles.iconModelTimeOut}>
                        <Life 
                            removeLife={true}
                        />
                    </div>
                    <div className={styles.textYouWin}> 
                        <span style={{"color": "#FCC123", "fontSize": "2.2rem", "textAlign": "center"}}>Você Acertou!!!</span>
                        <div className={styles.contentPoint}>
                            <span> Pergunta: <span style={{"color": "#b18e2e"}}> {pointAsk} </span> pontos</span>
                            <span> Dicas usadas: <span style={{"color": "#b18e2e"}}> {tipUsedAnswered} </span></span>
                            <span> Você recebeu: <span className={styles.point}> {pointAnswer} </span> pontos.</span>
                            
                        </div>
                    </div>

                    <div className={styles.contentBtn}>
                        <ButtonStudenTertiary onClick={ () => { handleFindNewAsk(); handleCloseModelAnswerCorrect()} }>
                            Próxima
                        </ButtonStudenTertiary>
                    </div>
                </div>
            </div>

            <div className={styles.modelTimeOut} id={"modelWrong"}>
                <div className={styles.contentModelTimeOut}>
                    <div className={styles.iconModelTimeOut}>
                        <Life 
                            removeLife={true}
                        />
                    </div>
                    <div className={styles.textYouWin}> 
                        <span  style={{"color": "#FF1B1B", "fontSize": "2.5rem"}}>Você Errou!!!</span>
                        <br />
                        <br />
                        <span>
                            A resposta correta era: <br/> <span style={{"color": "#FCC123"}} >{descriptionAnswerCorrect}</span>
                        </span>
                    </div>

                    <div className={styles.contentBtn}>
                        <ButtonStudenTertiary onClick={() => { handleFindNewAsk(); handleCloseModelAnswerIncorrect(); } }>
                            Próxima
                        </ButtonStudenTertiary>
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
