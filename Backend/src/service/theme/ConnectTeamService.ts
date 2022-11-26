import prismaClient from "../../prisma"


interface ConnectTeamRequest{
    teamID:string, 
    themeID:string,
    visible:boolean
}


class ConnectTeamService{
    async execute( {teamID, themeID, visible}:ConnectTeamRequest ){

        const theme = await prismaClient.teamsOnThemes.create({
            data:{
                teamID: teamID,
                themeID: themeID,
                visible: visible
            }
        })

        return theme

    }
}

export { ConnectTeamService }