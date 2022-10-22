import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcryptjs";
import prismaClient from "../../prisma";

const prisma = new PrismaClient();

type StudentProps = {
  name: string;
  register: number;
  active: boolean;
  password: string;
};

interface StudentRequest {
  students: StudentProps[];
  teamID: string;
}

class CreateManyStudentService {
  async execute({ students, teamID }: StudentRequest) {
    const team = await prismaClient.team.findUnique({
      where: {
        id: teamID,
      },
    });
    if (!team) {
      throw new Error("team not found.");
    }
    if (team.active === false) {
      throw new Error("team inative.");
    }

    const data = Array<StudentProps>();
    students.forEach((st) => {
      data.push({
        name: st.name,
        password: hashSync(st.password, 8),
        register: st.register,
        active: st.active,
      });
    });

    try {
      let i = 0;
      for (; i < data.length; i++) {
        await prismaClient.studentsOnTeams.create({
          data: {
            student: {
              create: {
                name: data[i].name,
                password: data[i].password,
                register: data[i].register,
                active: data[i].active,
              },
            },
            team: {
              connect: {
                id: teamID,
              },
            },
          },
        });
      }
      return {
          header: "Success",
          code: 200,
          description: {
            msg: "Cadastro efetuado com sucesso.",
            count: i
          }
        };
    } catch (err) {
      return {
        header: "Error",
        code: 500,
        description: err
      };
    }
  }
}

export { CreateManyStudentService };
