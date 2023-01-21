import prismaClient from "../../prisma";


interface RecommenceGameRequest{
    userRequest: {
        id: string;
        type: string;
    },
    positionID: string;
    dateRecommence: string;
}

class RecommenceGameService{
    async execute( { positionID, userRequest, dateRecommence }: RecommenceGameRequest) {
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
                life: 3,
                score: 0,
                attempt: 0,
                finished: false,
                finishedOver: false,
                finishedTime: false,
                dateFinalization: null
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
                attempt: true,
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

        prismaClient.game.findMany({
            where: {
                positionID: positionID 
            },
            select: {
                id: true
            }
        })
        .then(resp => {
            resp.forEach(async value => {
                await prismaClient.game.update({
                    where: {
                        id: value.id
                    },
                    data: {
                        point: 0,
                        tip: 0,
                        dateFinalization: null,
                        answered: false,
                        correct: false
                    }
                })
            })
        })
        .catch(err => {
            console.log(err);
        })


        return positionChanged

    }
}

export { RecommenceGameService }