import prismaClient from "../../prisma";

interface FindAskGameRequest{
    gameID: string;
    askID: string;
    dateVisualized: string;
    userRequest: {
        id: string;
        type: string;
    };
}


class FindAskGameService{
    async execute( {gameID, askID, dateVisualized, userRequest}: FindAskGameRequest ){

        if (userRequest.type != "student"){
            throw new Error("user is not a student.")
        }

        await prismaClient.game.update({
            where:{
                id: gameID
            },
            data: {
                dateVisualized: dateVisualized
            }
        })
        


        const ask = await prismaClient.ask.findUnique({
            where: {
                id: askID
            },
            select: {
                id: true,
                level: true,
                question: true,
                image: true,
                game: {
                    where:{
                        id: gameID,
                    },
                    select:{
                        dateVisualized: true,
                        timeOut: true,
                        dateCreated: true,
                        dateFinalization: true,
                    }
                },
                tip: {
                    where: {
                        visible: true,
                    },
                    select: {
                        id: true,
                        name: true,
                    }
                },
                answer: {
                    select: {
                        id: true,
                        description: true,
                    }
                }
            }
        })


        return ask

    }
}

export { FindAskGameService }