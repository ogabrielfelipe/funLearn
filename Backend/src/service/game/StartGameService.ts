import prismaClient from "../../prisma";



interface StartGameRequest{
    themeID: string;
    studentID: string;
    dataInitial: string;
    dateFinalization: string;
    userRequest: {
        id: string;
        type: string;
    },
    score: number,
    life: number,
}


class StartGameService{
    async execute( { themeID, studentID, dataInitial, dateFinalization, userRequest, score, life }:StartGameRequest ) {

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

        const verifyStudent = await prismaClient.position.findFirst({
            where: {
                studentID: student.id,
                themeID: theme.id
            },
            select: {
                id: true
            }
        })
        if (verifyStudent){
            throw new Error('student already has registration.')
        }


        const gameStart = await prismaClient.position.create({
            data: {
                started: true,
                studentID: student.id,
                themeID: theme.id,
                dateInitial: dataInitial,
                dateFinalization: dateFinalization,
                finished: false,
                finishedOver: false,
                finishedTime: false,
                score: score,
                life: life
            },
            select: {
                id: true,
                dateInitial: true,
                dateFinalization: true,
                started: true,
                finished: true,
                finishedOver: true,
                finishedTime: true,
                life: true,
                score: true,
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