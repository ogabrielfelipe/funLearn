import prismaClient from "../../prisma";


interface FindThemesByStudentRequest{
    userRequest: {
        id: string;
        type: string
    }
}


class FindThemesByStudentService{
    async execute( { userRequest }: FindThemesByStudentRequest ){
        if (userRequest.type != "student"){
            throw new Error("user is not a student.")
        }

        const teams = await prismaClient.teamsOnThemes.findMany({
           where:{
            visible: true,
            team:{
                students:{
                    some:{
                        student:{
                            id: userRequest.id
                        }
                    }
                },
                active: true
            },
            theme:{
                active: true
            }
           },
           select:{
            theme:{
                select:{
                    id: true,
                    name: true,
                    description: true,
                    positions:{
                        select:{
                            id: true,
                            dateInitial: true,
                            dateFinalization: true,
                            finished: true,
                            finishedOver: true,
                            finishedTime: true,
                        }
                    }
                }
            },
            team:{
                select:{
                    id: true,
                    name: true,
                    teacher: {
                        select: {
                            id: true,
                            name: true,
                        }
                    }

                }
            }
           }
        })

        return teams
    }
}

export { FindThemesByStudentService }