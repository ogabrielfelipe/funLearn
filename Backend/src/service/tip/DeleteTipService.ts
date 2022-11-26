import prismaClient from "../../prisma";



class DeleteTipService{
    async execute(id: string){
        const tip = await prismaClient.tip.delete({
            where:{
                id: id
            }
        })

        return tip
    }
}

export { DeleteTipService }