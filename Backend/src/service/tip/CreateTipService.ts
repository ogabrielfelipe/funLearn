import prismaClient from "../../prisma";

type TipProps = {
    name: string;
    askID: string;
    visible: boolean;
}

class CreateTipService{
    async execute( { name, askID, visible }: TipProps ){

        const ask = await prismaClient.ask.findUnique({
            where:{
                id: askID
            },
            select:{
                id: true
            }
        })

        if (!ask){
            throw new Error('Ask not found.')
        }


        const tip = await prismaClient.tip.create({
            data:{
                name: name,
                visible: visible,
                ask:{
                    connect:{
                        id: ask.id,
                    }
                }

            },
            select:{
                id: true,
                name: true,
            }
        })

        return tip
    }
}

export { CreateTipService }