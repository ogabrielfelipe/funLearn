import { hash } from "bcryptjs";
import prismaClient from "../../prisma";

interface StudentRequest {
  name: string;
  register: number;
  password: string;
  active: boolean;
  teamID: string;
}

/**
 *  Para resolver o problema do register por ser BigInt e o JSON não transformar para string, foi implementado
 * o arquivo patch.ts dentro da pasta src, ele pega o valor do BigInt e converter em string. 
 */

class CreateStudentService {
  async execute({ name, register, password, active, teamID }: StudentRequest) {

    if (!password) {
      throw new Error("password invalid");
    }
    const passwordHash = await hash(password, 8);

    const team = await prismaClient.team.findFirst({
      where: {
        id: teamID
      }
    })

    if (!team){
      throw new Error('team not found.')
    }

    if (!team.active){
      throw new Error('team inative.')
    }

    const create = await prismaClient.studentsOnTeams.create({
      data: {
        student: {
          create:{
            name: name,
            password: passwordHash,
            register: register,
            active: active,
          }
        },
        team:{
          connect:{
            id: teamID
          }
        }
      },
      select: {
        student:{
          select: {
            id: true,
            name: true,
            register: true,
            active: true,
            teams:{
              select:{
                team:{
                  select:{
                    id: true,
                    name: true
                  }
                }
              }
            }
          }
        }
      },
    });

    return create
  }
}

export { CreateStudentService };
