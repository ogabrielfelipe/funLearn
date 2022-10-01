import prismaClient from "../../prisma"


interface AnswerRequest{
    description: string, 
    correct: boolean, 
    answerID: string
}

class ChangeAnswerService{
    async execute( { answerID, description, correct }:AnswerRequest ){

        const answer = await prismaClient.answer.findUnique({
            where:{
                id: answerID
            }
        })

        if(!answer){
            throw new Error('answer not found.')
        }


        const ListAnswerOnAsk = await prismaClient.answer.findMany({
            where:{
                askID: answer.askID
            }
        })

        
        let countCorrect = 0;
        for(let i = 0; i < ListAnswerOnAsk.length; i++){
            if (ListAnswerOnAsk[i].correct){
                countCorrect++;
            }
        }
        if (countCorrect != 0 && correct){
            throw new Error('There is already a correct alternative.')
        }

        
        const changeAnswer = await prismaClient.answer.update({
            where:{
                id: answer.id
            },
            data:{
                description: description != "" ? description : answer.description,
                correct: correct != null ? correct : answer.correct,
            }
        })

        return changeAnswer
    }
}

export { ChangeAnswerService }