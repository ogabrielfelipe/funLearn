import prismaClient from "../../prisma"


interface ImageOnAskRequest{
    askID: string,
    image: string
}


class ChangeImageOnAskService{
    async execute( { askID, image }:ImageOnAskRequest ){

        const ask = await prismaClient.ask.findUnique({
            where:{
                id: askID
            }
        })

        if (!ask){
            throw new Error('ask not found.')
        }

        const askChange = await prismaClient.ask.update({
            where:{
                id: askID
            },
            data:{
                image: image
            }
        })

        return askChange

    }
}

export { ChangeImageOnAskService }