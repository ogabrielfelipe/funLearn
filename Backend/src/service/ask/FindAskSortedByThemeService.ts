import prismaClient from "../../prisma";


enum Level {
    INITIAL = "INITIAL",
    INTERMEDIARY = "INTERMEDIARY",
    ADVANCED = "ADVANCED",
}

interface AskSortedRequest{
    themeID: string;
    level: Level ;
    quantity: number;
}

class FindAskSortedByThemeService{
    async execute({ themeID, level, quantity }:AskSortedRequest){

        const askCounts = await prismaClient.ask.findMany({
            where: {
                themeID: themeID,
                level: level,
            }
        })

        const asks = await prismaClient.ask.findMany({
            take: quantity,
            orderBy: {
                id: 'desc',
            },
            where: {
                themeID: themeID,
                level: level,
            },
            select: {
                id: true,
                level: true
            }
        })

        return asks
    }
}

export { FindAskSortedByThemeService }