import prismaClient from "../../prisma";


type TeamOnThemeRequest = {
    teamID: string,
    visible: boolean
}

interface ThemesRequest{
    name: string;
    description: string;
    teacherID: string;
    teams: TeamOnThemeRequest[];
}

class CreateThemeService{
    async execute( { name, description, teacherID, teams }: ThemesRequest ){        
        const createTheme = await prismaClient.theme.create({
            data: {
                name: name,
                description: description,
                teacherID: teacherID
            },
            select:{
                id:true,
                name: true,
                description: true,
                teacher: {
                    select:{
                        id: true,
                        name: true,
                    }
                }
            }
        })
        var countConnectTeam = 0
        var dataTeamsConnected = []
        if (createTheme){
            try{
                for (var i = 0; i < teams.length; i++){
                    var teamsOnThemeCon = await prismaClient.teamsOnThemes.create({
                        data:{
                            team:{
                                connect:{
                                    id: teams[i].teamID
                                }
                            },
                            visible: teams[i].visible,
                            theme: {
                                connect:{
                                    id: createTheme.id
                                }
                            }
                        },
                        select:{
                            team:{
                                select:{
                                    id: true,
                                    name: true,
                                    active: true
                                }
                            }
                        }
                    })
                    dataTeamsConnected.push(teamsOnThemeCon)
                    countConnectTeam += 1;
                }

                return {
                    data:{
                        theme: createTheme,
                        connectTeams: {
                            total: countConnectTeam,
                            data: dataTeamsConnected
                        },

                    }
                }
            }catch(err){
                await prismaClient.theme.delete({
                    where:{
                        id: createTheme.id
                    }
                })

                return err
            }
        }
    }
}

export { CreateThemeService }