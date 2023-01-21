import prismaClient from "../../prisma";


enum TypeFinish {
    GAMEOVER = "GAMEOVER",
    TIME = "TIME",
    FINISHED = "FINISHED",
}

interface FinishedGameOverRequest{
    positionID: string;
    score: number;
    dateFinished: string;
    finished: boolean;
    attempt: number;
    life: number;
    userRequest: {
        id: string;
        type: string;
    };
    typeFinish: TypeFinish
}


class FinishedGameOverService{
    async execute( { positionID, dateFinished, finished, attempt, life, score, userRequest, typeFinish }:FinishedGameOverRequest ){
        if (userRequest.type != "student"){
            throw new Error("user is not a student.")
        }

        const position = await prismaClient.position.findUnique({
            where: {
                id: positionID
            }
        })

        if (!position){
            throw new Error("Position not found.");
        }

        const pointTotal = await prismaClient.game.findMany({
            where: {
                positionID: positionID
            },
            select: {
                point: true
            }
        })

        if (pointTotal){
            for (let i = 0; i < pointTotal.length; i++){
                score += pointTotal[i].point
            }
        }

        const resultPosition = await prismaClient.position.update({
            where: {
                id: positionID
            },
            data: {
                dateFinalization: dateFinished,
                ...(typeFinish === "GAMEOVER" ? {finishedOver: finished} : typeFinish === "TIME" ? {finishedTime: finished} : {finished: finished}),
                attempt: attempt,
                life: life,
                score: score,
            }
        })
        
        return resultPosition

    }

}

export { FinishedGameOverService }