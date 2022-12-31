import prismaClient from "../../prisma";


interface CreatePositionGameRequest{
    askID: string, 
    answerID: string, 
    positionID: string, 
    attempt: number, 
    tip: number, 
    time: string,
    point: number,
    right: boolean,
    userRequest: {
        id: string;
        type: string;
    },
}


class CreatePositionGameService{
    async execute( { askID, answerID, attempt, positionID, tip, userRequest, point, right, time }: CreatePositionGameRequest ){
        if (userRequest.type != "student"){
            throw new Error("user is not a student.")
        }


        const game = await prismaClient.game.create({
            data: {
                positionID: positionID,
                askID: askID,
                tip: tip,
                attempt: attempt,
                point: point,
                right: right,
                time: time
            },
            select: {
                id: true,
                point: true,
                right: true,
            }
        })


        return game


    }
}

export { CreatePositionGameService }