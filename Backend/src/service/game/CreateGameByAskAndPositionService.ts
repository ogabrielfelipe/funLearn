import prismaClient from "../../prisma";

interface CreateGameByAskRequest {
  positionID: string;
  askID: string;
  tip: number;
  point: number;
  correct: boolean;
  answered: boolean;
  dateCreated: string;
  dateFinalization: string | null;
}

class CreateGameByAskAndPositionService {
  async execute({
    positionID,
    askID,
    answered,
    correct,
    dateCreated,
    dateFinalization,
    point,
    tip,
  }: CreateGameByAskRequest) {

    const game = await prismaClient.game.create({
        data: {
            answered: answered,
            correct: correct,
            dateCreated: dateCreated,
            dateFinalization: dateFinalization,
            point: point,
            tip: tip,
            askID: askID,
            positionID: positionID,
        },
        select: {
            id: true            
        }
    })


    return game

  }
}

export { CreateGameByAskAndPositionService };
