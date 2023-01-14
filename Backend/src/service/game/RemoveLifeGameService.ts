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
        const attempt = 1;

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
        let attemptAnswer = game.attempt +  attempt;
        let removeLifeByGame;
        if (lifeToday <= 0){
            removeLifeByGame = await this._FinishedGameByTimeOut(game.id)
        }


        removeLifeByGame = await prismaClient.game.update({
            where: {
                id: game.id
            },
            data: {
                attempt: attemptAnswer,
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

        return removeLifeByGame;
    }

    async _FinishedGameByTimeOut(gameID: string){
        let DateTimePTBR = moment.tz(new Date(), "America/Sao_Paulo");

        const removeLifeByGame = await prismaClient.game.update({
            where: {
                id: gameID
            },
            data: {
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
                attempt: true,
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