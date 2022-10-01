import prismaClient from "../../prisma"


interface FindManyAskRequest{
    question: string
}

class FindManyAskService{
    async execute ( { question }: FindManyAskRequest ){

        const asks = await prismaClient.ask.findMany({
            where:{
                ...(!question ? {} : { question: { contains: `%${question}%` }}),
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