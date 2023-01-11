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
import { ButtonStudenTertiary, ButtonStudentSecondary, ButtonStudentPrimary } from "../../components/Button";

import styles from './Game.module.css'


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


export default function GameStudent(){
    const apiClient = setupAPIClient();
    const router = useRouter();
    const { positionID } = router.query;


    const [loading, setLoading] = useState(true);
    const [detailsPosition, setDetailsPosition] = useState<detailsPositionType>();


    useEffect(() => {        
        async function getPosition(positionID: string){
            setLoading(true);

            await apiClient.get(`/game/find/position/${positionID}`)
            .then(resp => {
                setDetailsPosition(resp.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            })
        }


        getPosition(positionID as string)

    }, [positionID])


    return (
        <>
            <Head>
                <title>{detailsPosition?.theme.name} - FunLearn</title>
            </Head>

            <header className={styles.header}>
                <div className={styles.contentGame}>
                    <div className={styles.life}>
                        <LottieFilesLife 
                            removeLife={false}
                        />
                        <LottieFilesLife 
                            removeLife={false}
                        />
                        <LottieFilesLife 
                            removeLife={true}
                        />
                    </div>

                    <div className={styles.contentCoin}>
                        <Coin/>
                        <strong className={styles.textCoin}>
                            1500
                        </strong>
                    </div>


                </div>
                

                <ButtonStudenTertiary>
                    Tela Inicial
                </ButtonStudenTertiary>

            </header>

            <main>
                    
                <div className={styles.container}>
                    <div className={styles.containerAsk}>
                        Perguntas
                    </div>

                    <div className={styles.containerAnswTip}>                        
                        <div>
                            <Time />
                            <Lamp />

                            dicas
                        </div>

                        <div>
                            Lista das respostas
                        </div>

                    </div>


                </div>


                <div style={{
                    position: 'fixed',
                    right: '5rem',
                    bottom: '5rem',
                }}>
                    <ButtonStudentPrimary>
                        Próximo
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

        </>
    ) 

}


export const getServerSideProps = canSSRAuth( async (ctx: any) => {

    return {
        props:{}
    }

} )