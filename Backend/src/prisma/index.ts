import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prismaClient = new PrismaClient()

async function main() {
    
    const NAME = "Usuário Administrador"
    const USERNAME = "admin"
    const PASSWORD = "funLearn"

    prismaClient.administrator.findFirst({
        where:{
            username: "admin"
        }
    }).then(async resp =>{
        if (!resp){
            const passwordHash = await hash(PASSWORD, 8)

            const createAdmin = await prismaClient.administrator.create({
                data:{
                    name: NAME,
                    username: USERNAME,
                    password: passwordHash
                },
                select:{
                    id: true,
                    name: true,
                    username: true
                }
            })
        }
    })

    
}
  
  main()
    .then(async () => {
      await prismaClient.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prismaClient.$disconnect()
      process.exit(1)
    })


export default prismaClient;