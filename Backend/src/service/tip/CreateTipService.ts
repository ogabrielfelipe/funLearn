import prismaClient from "../../prisma";

type TipProps = {
    name: string;
    askID: string;
    visible: boolean;
}

class CreateTipService{
    async execute( { name, askID, visible }: TipProps ){
        const tip = await prismaClient.tip.create({
            data:{
                name: name,
                visible: visible,
                ask:{
                    connect:{
                        id: askID,
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