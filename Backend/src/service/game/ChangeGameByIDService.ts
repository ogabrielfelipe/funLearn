import prismaClient from "../../prisma";

interface ChangeGameRequest {
  gameID: string;
  point: number | null;
  tip: number | null;
  attempt: number | null;
  answered: boolean | null;
  correct: boolean | null;
  dateFinalization: string | null;
  userRequest: {
      id: string;
      type: string;
  };
}

class ChangeGameByIDService {
  async execute({
    gameID,
    point,
    tip,
    attempt,
    answered,
    correct,
    dateFinalization,
    userRequest
  }: ChangeGameRequest) {

    if (userRequest.type != "student"){
        throw new Error("user is not a student.")
    }


    const game = await prismaClient.game.findUnique({
        where: {
            id: gameID
        }
    })

    if (!game){
        throw new Error("game not found.");
    }

    const gameChanged = await prismaClient.game.update({
        where: {
            id: game.id
        },
        data: {
            point: point === null? game.point : point,
            answered: answered === null? game.answered : answered,
            attempt: attempt === null ? game.attempt : attempt,
            correct: correct === null ? game.correct : correct,
            dateFinalization: dateFinalization === null ? game.dateFinalization : dateFinalization,
            tip: tip === null ? game.tip : tip,
        },
        select: {
            id: true,
            answered: true,
            point: true,
            dateCreated: true,
            dateFinalization: true,
            ask:{
                select:{
                    answer: {
                        where:{
                            correct: true,
                        },
                        select: {
                            description: true,
                            correct: true,
                        }
                    }
                }
            }
        }
    })

    if (correct){
        const position = await prismaClient.position.findFirst({
            where: {
                game: {
                    some: {
                        id: game.id
                    }
                }
            }
        })

        if (position){
            await prismaClient.position.update({
                where: {
                    id: position.id
                },
                data:{
                    score: point != null ? position.score! + BigInt(point) : position.score
                } 
            })

        }
    }


    return gameChanged
    
  }
}

export { ChangeGameByIDService };
