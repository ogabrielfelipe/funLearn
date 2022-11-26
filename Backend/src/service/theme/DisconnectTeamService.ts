import prismaClient from "../../prisma";

interface DisconnectTeamRequest{
    teamID:string, 
    themeID:string
}

class DisconnectTeamService{
    async execute( {teamID, themeID}:DisconnectTeamRequest ){
        const theme = await prismaClient.teamsOnThemes.delete({
            where: {
                teamID_themeID: {
                    teamID: teamID,
                    themeID: themeID
                }
            }
        })
        return theme
    }
}

export { DisconnectTeamService }