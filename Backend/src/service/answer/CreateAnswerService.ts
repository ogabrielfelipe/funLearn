import prismaClient from "../../prisma"


interface AnswerRequest{
    description: string, 
    correct: boolean, 
    askID: string
}

class CreateAnswerService{
    async execute( {description, correct, askID}:AnswerRequest ){

        if (typeof description != "string"){
            throw new Error("description type incorrect.")
        }
        if (typeof correct != "boolean"){
            throw new Error('correct type incorrect.')
        }

        const findAnswerOnAsk = await prismaClient.answer.findMany({
            where:{
                askID: askID
            }
        })

        console.log(findAnswerOnAsk)
        console.log(findAnswerOnAsk.length)

        if (findAnswerOnAsk.length === 4){
            throw new Error('number of questions different from 4.')
        }


        let countCorrect = 0;
        for(let i = 0; i < findAnswerOnAsk.length; i++){
            if (findAnswerOnAsk[i].correct){
                countCorrect++;
            }
        }
        if (countCorrect != 0 && correct){
            throw new Error('There is already a correct alternative.')
        }

        const createAnswer = await prismaClient.answer.create({
            data: {
                description: description,
                correct: correct,
                askID: askID
            }
        })   
        
        return createAnswer
    }
}

export { CreateAnswerService }