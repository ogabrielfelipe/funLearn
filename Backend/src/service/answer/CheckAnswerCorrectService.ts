import prismaClient from "../../prisma";


interface CheckAnswerCorrectRequest{
    answerID: string;
    userRequest: {
        id: string;
        type: string;
    };
}



class CheckAnswerCorrectService{
    async execute( { answerID, userRequest }: CheckAnswerCorrectRequest ){

        if (userRequest.type != "student"){
            throw new Error("user is not a student.")
        }


        const answer = await prismaClient.answer.findUnique({
            where: {
                id: answerID,
            },
            select: {
                id: true,
                correct: true,
                ask:{
                    select:{
                        level: true
                    }
                }
            }
        })

        return answer

    }
}

export { CheckAnswerCorrectService }