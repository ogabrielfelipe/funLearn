import prismaClient from "../../prisma"


class FindStudantService{
    async execute(studentID: string){

        if(!studentID){
            throw new Error('studant is required.')
        }

        const studant = await prismaClient.studant.findUnique({
            where:{
                id: studentID
            },
            select:{
                id: true,
                active: true,
                name: true,
                register: true,
                teams:{
                    select:{
                        team:{
                            select:{
                                id: true,
                                name: true,
                                active: true,
                                teacher:{
                                    select:{
                                        id: true,
                                        name: true,
                                        active: true
                                    }
                                }
                            }
                        }
                    }
                },
                position:{
                    select:{
                        id: true,
                        finish: true,
                        pointing: true,
                        score: true,
                        ask:{
                            select: {
                                id: true,
                                image: true,
                                active: true,
                                level: true,
                                answer:{
                                    select:{
                                        id: true,
                                        description: true,
                                        correct: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })


        if (!studant){
            throw new Error('studant not found.')
        }

        return studant


    }
}

export { FindStudantService }