import { PrismaClient } from "@prisma/client";
import { PrismaClientInitializationError } from "@prisma/client/runtime";
import { hash } from "bcryptjs";

const prismaClient = new PrismaClient()

async function connectDB(){
    console.log("💥 Connecting to database...");

    prismaClient.$connect()
        .then(() => {        
            console.log("✅ Connected to database");
        })
        .catch(err => {
            console.error("👾 Failed to connect to the database.\n", err)
            process.abort();

        })
}

async function main() {
    
    const NAME = "Usuário Administrador"
    const USERNAME = "admin"
    const PASSWORD = "funLearn"

    connectDB()
        .then(async () =>{
            await prismaClient.administrator.findFirst({
                where:{
                    username: "admin"
                }
            }).then(async resp =>{
                if (!resp){
                    const passwordHash = await hash(PASSWORD, 8)
        
                    await prismaClient.administrator.create({
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
        })
}
  
  main()
    .then(async () => { 
      await prismaClient.$disconnect()
    })
    .catch(async (e) => {
      await prismaClient.$disconnect()
      process.exitCode = 1;
    })


export default prismaClient;