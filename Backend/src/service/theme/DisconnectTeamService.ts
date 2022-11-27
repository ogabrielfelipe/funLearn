import prismaClient from "../../prisma";

interface DisconnectTeamRequest{
    teamID:string, 
    themeID:string,
    visible:boolean
}

class DisconnectTeamService{
    async execute( {teamID, themeID, visible}:DisconnectTeamRequest ){
        const theme = await prismaClient.teamsOnThemes.update({
            data:{
                visible: visible
            },
            where:{
                teamID_themeID:{
                    teamID: teamID,
                    themeID: themeID
                }
            }
        })
        return theme
    }
}

export { DisconnectTeamService }