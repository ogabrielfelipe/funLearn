import prismaClient from "../../prisma"


interface FindManyAskRequest{
    question: string,
    user: {
        id: string,
        type: string
    }
}

class FindManyAskService{
    async execute ( { question, user }: FindManyAskRequest ){

        const asks = await prismaClient.ask.findMany({
            where:{
                ...(!question ? {} : { question: { contains: `%${question}%` }}),
                ...(user.type === 'teacher'? {theme: {  teacherID: user.id  }} : {})
                
            },
            select:{
                id: true,
                question: true,
                level: true,
                active: true
            }
        })

        return asks
    }
}

export { FindManyAskService }