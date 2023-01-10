import Head from "next/head";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LoadingManager } from "../../components/Loading";
import { setupAPIClient } from "../../services/api";
import { canSSRAuth } from "../../utils/canSSRAuth";

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
            <main>
                {detailsPosition?.id}
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