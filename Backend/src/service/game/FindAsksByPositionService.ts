import prismaClient from "../../prisma";


interface FindAsksByPositionRequest{
    userRequest: {
        id: string;
        type: string;
    },
    positionID: string;
}

class FindAsksByPositionService{
    async execute( { userRequest, positionID }: FindAsksByPositionRequest ){
        if (userRequest.type != "student"){
            throw new Error("user is not a student.")
        }

        const asks = await prismaClient.game.findMany({
            where: {
                positionID: positionID,
                position: {
                    studentID: userRequest.id
                }
            },
            orderBy: [
                {
                    ask: {
                        level: 'asc'
                    }
                }
            ],
            select: {
                ask: {
                    select: {
                        id: true,
                        level: true,
                    }
                },
                answered: true,
                id: true,
            }
        })


        return asks
    }
}

export { FindAsksByPositionService }