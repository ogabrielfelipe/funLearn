import prismaClient from "../../prisma";


interface ThemesRequest{
    name: string,
    user: {
        id: string,
        type: string
    } 
}

class FindThemesService{
    async execute( { name, user }:ThemesRequest  ){
        const themes = await prismaClient.theme.findMany({
            where:{
                
                ...(!name ? {} : { name: { contains: `%${name}%` }}),
                ...(user.type === 'teacher' ? {teacherID : user.id} : {})
               
            },
            select:{
               id: true,
               name: true,
               description: true,
               teams:{
                select:{
                    team:{
                        select:{
                            id: true,
                            name: true,
                            active: true,
                        }
                    }
                }
               },
               teacher:{
                select:{
                    id: true,
                    name: true,
                    active: true,
                }
               }
            }
        })

        return themes
    }
}

export { FindThemesService }