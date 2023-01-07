import prismaClient from "../../prisma";


interface RecommenceGameRequest{
    userRequest: {
        id: string;
        type: string;
    },
    positionID: string;
    dateRecommence: string;
    dateFinalizationRecommence: string;
}

class RecommenceGameService{
    async execute( { positionID, userRequest, dateRecommence, dateFinalizationRecommence }: RecommenceGameRequest) {
        if (userRequest.type != "student"){
            throw new Error("user is not a student.")
        }

        const position = await prismaClient.position.findUnique({
            where: {
                id: positionID
            },
            select: {
                id: true,
                qtdRecommence: true,
                recommence: true
            }
        })
        if (!position){
            throw new Error("position not found.")
        }

        let valueRecommence = 1;

        const positionChanged = await prismaClient.position.update({
            where: {
                id: position.id
            },
            data: {
                qtdRecommence: position.qtdRecommence + valueRecommence,
                recommence: true,
                dateRecommence: dateRecommence,
                dateFinalizationRecommence: dateFinalizationRecommence
            },
            select: {
                id: true,
                dateInitial: true,
                dateFinalization: true,
                started: true,
                finished: true,
                finishedOver: true,
                finishedTime: true,
                life: true,
                score: true,
                dateRecommence: true,
                dateFinalizationRecommence: true,
                qtdRecommence: true,
                recommence: true,
                student: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                theme: {
                    select:{
                        id: true,
                        name: true
                    }
                }
            }
        })


        return positionChanged

    }
}

export { RecommenceGameService }