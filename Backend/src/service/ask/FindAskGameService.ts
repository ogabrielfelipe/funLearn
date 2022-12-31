import prismaClient from "../../prisma";

interface FindAskGameRequest{
    askID: string;
    userRequest: {
        id: string;
        type: string;
    },
}


class FindAskGameService{
    async execute( {askID, userRequest}: FindAskGameRequest ){

        if (userRequest.type != "student"){
            throw new Error("user is not a student.")
        }


        const ask = await prismaClient.ask.findUnique({
            where: {
                id: askID
            },
            select: {
                id: true,
                level: true,
                question: true,
                image: true,
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