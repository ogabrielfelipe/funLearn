import prismaClient from "../../prisma"


class FindStudentService{
    async execute(studentID: string){

        if(!studentID){
            throw new Error('student is required.')
        }

        const student = await prismaClient.student.findUnique({
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
                }
            }
        })


        if (!student){
            throw new Error('student not found.')
        }

        return student


    }
}

export { FindStudentService }