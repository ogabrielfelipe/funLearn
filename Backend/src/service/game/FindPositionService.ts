import prismaClient from "../../prisma"



class FindPositionService{
    async execute(positionID: string){
        const position = await prismaClient.position.findUnique({
            where: {
                id: positionID
            },
            select:{
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

        return position
    }
}

export { FindPositionService }