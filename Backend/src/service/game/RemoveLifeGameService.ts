import prismaClient from "../../prisma";

import moment from "moment-timezone";

interface RemoveLifeGameRequest{
    userRequest: {
        id: string;
        type: string;
    },
    gameID: string
}


class RemoveLifeGameService{
    async execute( {userRequest, gameID}:RemoveLifeGameRequest ){
        if (userRequest.type != "student"){
            throw new Error("user is not a student.")
        }

        const removeLife = 1;

        const game = await prismaClient.game.findUnique({
            where:{
                id: gameID
            }
        })

        if (!game){
            throw new Error("game not found.")
        }

        const position = await prismaClient.position.findUnique({
            where: {
                id: game.positionID
            }
        })

        if (!position){
            throw new Error("position not found.")
        }

        let lifeToday = position.life as number - removeLife;
        let removeLifeByGame;
        if (lifeToday <= 0){
            console.log("Usuário nao possio mais vida")
            removeLifeByGame = await this._FinishedGameByTimeOut(game.id)
        }


        removeLifeByGame = await prismaClient.game.update({
            where: {
                id: game.id
            },
            data: {
                timeOut: true,
                position: {
                    update: {
                        life: lifeToday
                    }
                }
            },
            select: {
                id: true,
                position: {
                    select: {
                        id: true,
                        life: true
                    }
                }
            }
        })

/*
        const position = await prismaClient.position.findUnique({
            where:{
                id: game.positionID
            }
        })

        if (!position){
            throw new Error("position not found.")
        }

        let lifeToday: number = position.life - removeLife;

        prismaClient.position.update({
            where:{
                id: position.id
            },
            data: {
                life: lifeToday
            }
        })


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
*/

        return removeLifeByGame;
    }

    async _FinishedGameByTimeOut(gameID: string){
        let DateTimePTBR = moment.tz(new Date(), "America/Sao_Paulo");

        const removeLifeByGame = await prismaClient.game.update({
            where: {
                id: gameID
            },
            data: {
                timeOut: true,
                dateFinalization: DateTimePTBR.format(),
                position: {
                    update: {
                        life: 0,
                        finishedTime: true,
                        dateFinalization: DateTimePTBR.format()
                    }
                }
            },
            select: {
                id: true,
                dateFinalization: true,
                timeOut: true,
                position: {
                    select: {
                        id: true,
                        life: true,
                        dateFinalization: true
                    }
                }
            }
        })
    }
}

export { RemoveLifeGameService }