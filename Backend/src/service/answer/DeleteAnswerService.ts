import prismaClient from "../../prisma";


interface deleteAnswerRequest{
    askID: string | null;
    answerID: string | null
}

class DeleteAnswerService{
    async execute( { askID, answerID }:deleteAnswerRequest ){
        let deleteAnswer;
        if (askID){
            deleteAnswer = await prismaClient.answer.deleteMany({
                where:{
                    askID: askID
                }
            })
        }else if (answerID){
            deleteAnswer = await prismaClient.answer.deleteMany({
                where:{
                    id: answerID
                }
            })
        }

        return deleteAnswer
    }
}

export { DeleteAnswerService }