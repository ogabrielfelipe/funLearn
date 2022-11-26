import prismaClient from "../../prisma";

type TipProps = {
    id: string;
    name: string;
    visible: boolean;
}

class ChangeTipService{
    async execute( {id, name, visible}:TipProps ){
        const tip = await prismaClient.tip.findUnique({
            where:{
                id: id
            }
        })

        if (!tip){
            throw new Error('tip not found.')
        }

        const tipChange = await prismaClient.tip.update({
            where:{
                id: tip.id
            },
            data:{
                name: name != "" ? name : tip.name,
                visible: visible != null ? visible : tip.visible
            },
            select:{
                id: true,
                name: true,
                visible: true,
            }
        })


        return tipChange
    }
}

export { ChangeTipService }