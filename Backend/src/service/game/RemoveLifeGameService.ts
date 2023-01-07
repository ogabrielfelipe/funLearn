import prismaClient from "../../prisma";

import moment from "moment-timezone";

interface RemoveLifeGameRequest{
    userRequest: {
        id: string;
        type: string;
    },
    positionID: string
}


class RemoveLifeGameService{
    async execute( {userRequest, positionID}:RemoveLifeGameRequest ){
        if (userRequest.type != "student"){
            throw new Error("user is not a student.")
        }

        const removeLife = 1;

        const position = await prismaClient.position.findUnique({
            where:{
                id: positionID
            }
        })

        if (!position){
            throw new Error("Position not found.")
        }

        let resultPosition = {};
        let lifePosition = position.life as number;
        if (lifePosition <= 1){

            let score: number = 0;
            lifePosition = 0
            let DateTimePTBR = moment.tz(new Date(), "America/Sao_Paulo");

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

            resultPosition = await prismaClient.position.update({
                where: {
                    id: positionID
                },
                data: {
                    dateFinalization: DateTimePTBR.format(),
                    finishedOver: true,
                    life: lifePosition,
                    score: score,
                },
                select:{
                    id: true,
                    dateFinalization: true,
                    dateInitial: true,
                    finished: true,
                    finishedOver: true,
                    finishedTime: true,
                    life: true,
                    score: true,
                    started: true,

                }
            })
        }else{

            resultPosition = await prismaClient.position.update({
                where: {
                    id: positionID
                },
                data: {
                    life: lifePosition - removeLife,
                },
                select:{
                    id: true,
                    dateFinalization: true,
                    dateInitial: true,
                    finished: true,
                    finishedOver: true,
                    finishedTime: true,
                    life: true,
                    score: true,
                    started: true,

                }
            })

        }


        return resultPosition

    }
}

export { RemoveLifeGameService }