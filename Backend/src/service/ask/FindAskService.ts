import prismaClient from "../../prisma"



class FindAskService{
    async execute(askID: string){

        const ask = await prismaClient.ask.findUnique({
            where:{
                id: askID,
            },
            include:{
                answer: true,
                theme: true,
                tip: true
            }
        })

        return ask

    }
}

export { FindAskService }