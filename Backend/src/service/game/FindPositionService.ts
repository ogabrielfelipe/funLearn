import prismaClient from "../../prisma"



class FindPositionService{
    async execute(positionID: string){
        const position = await prismaClient.position.findFirst({
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
                attempt: true,
                dateRecommence: true,
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