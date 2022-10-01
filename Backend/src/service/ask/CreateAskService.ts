import { Level } from "@prisma/client";
import prismaClient from "../../prisma";
import { CreateAnswerService } from "../answer/CreateAnswerService";
import { DeleteAnswerService } from "../answer/DeleteAnswerService";



type AnswerProps = {
    id: string | null;
    description: string,
    correct: boolean
}

interface AskRequest{
    question: string;
    active: boolean;
    image: string | undefined | null;
    level: Level;
    answer: AnswerProps[];
}

class CreateAskService{
    async execute( { question, active, image, level, answer }:AskRequest ){

        if (answer.length != 4){
            throw new Error('number of questions different from 4.')
        }

        let countCorrect = 0;
        for(let i = 0; i < answer.length; i++){
            if (answer[i].correct){
                countCorrect++;
            }
        }
        if (countCorrect != 1){
            throw new Error('there must be 1 correct question.')
        }
        
        const createAsk = await prismaClient.ask.create({
            data:{
                question: question,
                active: active,
                level: level,
                image: typeof image != "string" ? "": image,
            },
            select: {
                id: true,
            }
        })

        if (createAsk){
            const createAnswer = new CreateAnswerService();
            const deleteAnswer = new DeleteAnswerService();

            for (let i = 0; i < answer.length; i++){
                await createAnswer.execute({
                    description: answer[i].description,
                    correct: answer[i].correct,
                    askID: createAsk.id
                })
                .catch(async err => {
                    await deleteAnswer.execute({ askID: createAsk.id, answerID: null })
                    await prismaClient.ask.delete({
                        where: {
                            id: createAsk.id
                        }
                    })
                    throw new Error(err as string)
                })
            }

        }
        

        return await prismaClient.ask.findUnique({
            where:{
                id: createAsk.id
            },
            include:{
                answer: true
            }
        })
    }
}

export { CreateAskService }