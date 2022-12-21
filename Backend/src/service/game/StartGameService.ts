import prismaClient from "../../prisma";



interface StartGameRequest{
    themeID: string;
    studentID: string;
    dataInitial: string;
    userRequest: {
        id: string;
        type: string;
    }
}


class StartGameService{
    async execute( { themeID, studentID, dataInitial, userRequest }:StartGameRequest ) {

        if (userRequest.type != "student"){
            throw new Error("user is not a student.")
        }

        
        const theme = await prismaClient.theme.findUnique({
            where:{
                id: themeID,
            },
            select:{
                id: true
            }
        })

        if (!theme){
            throw new Error('theme not found.')
        }

        const student = await prismaClient.student.findUnique({
            where:{
                id: studentID
            },
            select:{
                id: true
            }
        })

        if (!student){
            throw new Error('student not found.')
        }

        const gameStart = await prismaClient.position.create({
            data: {
                started: true,
                studentID: student.id,
                themeID: theme.id,
                dateInitial: dataInitial
            },
            select: {
                id: true,
                dateInitial: true,
                started: true,
                student: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                theme: {
                    select:{
                        id: true,
                        name: true
                    }
                }
            }
        })

        return gameStart

    }
}

export { StartGameService }