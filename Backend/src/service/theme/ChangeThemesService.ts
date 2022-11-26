import prismaClient from "../../prisma";


interface ThemesRequest{
    id: string;
    name: string;
    description: string;
    teacherID: string;
    active: boolean;
}

class ChangeThemeService{
    async execute( { id, name, description, teacherID, active }: ThemesRequest ){
        const theme = await prismaClient.theme.findUnique({
            where:{
                id: id
            },
            select:{
                id: true,
                name: true,
                description: true,
                teacherID: true,
                active: true
            }
        })

        if (!theme) {
            throw new Error("Theme not found.")
        }

        const themeChange = await prismaClient.theme.update({
            where:{
                id: theme.id
            }, 
            data:{
                name: name != "" ? name : theme.name,
                description: description != "" ? description : theme.description,
                teacherID: teacherID != "" ? teacherID : theme.teacherID,
                active: active != null ? active : theme.active,
            }
        })

        return themeChange
    }
}

export { ChangeThemeService }