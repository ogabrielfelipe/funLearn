import prismaClient from "../../prisma";


interface AskRequest{
    id: string;
    question: string;
    active: boolean | null;
    themeID: string;
}

class ChangeAskService{
    async execute( {id, question, active, themeID }:AskRequest ){
        
        const ask = await prismaClient.ask.findUnique({
            where:{
                id: id
            },
            include:{
                answer: true
            }
        })

        if (!ask){
            throw new Error('Ask not found.')
        }

        if (ask.answer.length != 4){
            throw new Error('number of questions different from 4.')
        }

        let countCorrect = 0;
        for(let i = 0; i < ask.answer.length; i++){
            if (ask.answer[i].correct){
                countCorrect++;
            }
        }
        if (countCorrect === 0){
            throw new Error('A correct answer to the question has not been identified.')
        }

        if (countCorrect > 1){
            throw new Error('Question has more than one correct alternative.')
        }

        const theme = await prismaClient.theme.findUnique({
            where: {
                id: themeID
            }
        })
        if (!theme) {
            throw new Error('theme not found')
        }


        const changeAsk = await prismaClient.ask.update({
            where:{
                id: ask.id
            },
            data:{
                question: question != "" ? question : ask.question,
                active: active != null ? active : ask.active,
                themeID: theme.id
            },
            include:{
                answer: true
            }
        })
        

        return changeAsk

    }
}

export { ChangeAskService }