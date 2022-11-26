import prismaClient from "../../prisma"



class FindThemeService{
    async execute(themeID: string){
        const theme = await prismaClient.theme.findFirst({
            where:{
                id: themeID
            },
            select:{
                id: true,
                name: true,
                description: true,
                active: true,
                teacher:{
                    select:{
                        id: true,
                        name: true,
                    }
                },
                teams:{
                    select:{
                        team:{
                            select:{
                                id: true,
                                name: true,
                            }
                        },
                        visible: true
                    }
                }
            }
        }) 

        return theme
    }
}

export { FindThemeService }