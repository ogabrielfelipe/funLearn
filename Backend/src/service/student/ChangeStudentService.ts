import { hash } from "bcryptjs";
import prismaClient from "../../prisma";

interface studentChangeRequest {
  studentID: string;
  name: string;
  password: string;
  teamID: string;
  active: boolean | null;
}

class ChangeStudentService {
  async execute({
    studentID,
    name,
    password,
    teamID,
    active,
  }: studentChangeRequest) {
    // verificação e busca na table student

    const student = await prismaClient.student.findFirst({
      where: {
        id: studentID,
      },
    });

    if (!student) {
      throw new Error("student not found.");
    }

    // Criação da senha criptografada
    var passwordHash = "";

    if (password != null) {
      passwordHash = await hash(password, 8);
    }

    // verificação e busca na table Team

    if (!teamID) {
      throw new Error("team is required.");
    }

    const team = await prismaClient.team.findFirst({
      where: {
        id: teamID,
      },
    });

    if (!team) {
      throw new Error("team not found.");
    }

    if (!!!team.active) {
      throw new Error("team inative.");
    }

    // verificação e busca na table studentsOnTeams

    const studentsOnTeams = await prismaClient.studentsOnTeams.findFirst({
      where: {
        studentID: student.id,
      },
    });

    if (!studentsOnTeams) {
      throw new Error("student not found on table studentsOnTeams.");
    }

    // Alteração do aluno

    const changestudent = await prismaClient.student.update({
      where: {
        id: student.id,
      },
      data: {
        name: name === "" ? student.name : name,
        password: password === "" ? student.password : passwordHash,
        active: active === null ? student.active : active,
        teams: {
          updateMany: {
            where: {
              studentID: student.id,
            },
            data: {
              teamID: team.id,
            },
          },
        },
      },
      select: {
        id: true,
        name: true,
        active: true,
        register: true,
        teams: {
          select: {
            team: {
              select: {
                id: true,
                name: true,
                active: true,
              },
            },
          },
        },
      },
    });

    return changestudent;
  }
}

export { ChangeStudentService };
