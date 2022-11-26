import { Level } from "@prisma/client";
import prismaClient from "../../prisma";
import { CreateAnswerService } from "../answer/CreateAnswerService";
import { DeleteAnswerService } from "../answer/DeleteAnswerService";
import { CreateTipService } from "../tip/CreateTipService";



type AnswerProps = {
    id: string | null;
    description: string,
    correct: boolean
}
type TipProps = {
    id: string | null;
    name: string;
    visible: boolean;
}

interface AskRequest{
    question: string;
    active: boolean;
    image: string | undefined | null;
    level: Level;
    answer: AnswerProps[];
    tip: TipProps[];
    themeID: string;
}

class CreateAskService{
    async execute( { question, active, image, level, answer, tip, themeID }:AskRequest ){

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
                themeID: themeID
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

            const createTip = new CreateTipService();

            for (let i = 0; i < tip.length; i++) {
                await createTip.execute({
                    name: tip[i].name,
                    visible: tip[i].visible,
                    askID: createAsk.id
                })
                .catch(async err => {
                    console.log(err);
                    throw new Error(err as string);
                })
            }

        }
        

        return await prismaClient.ask.findUnique({
            where:{
                id: createAsk.id
            },
            include:{
                answer: true,
                tip: true,
                theme: true
            }
        })
    }
}

export { CreateAskService }