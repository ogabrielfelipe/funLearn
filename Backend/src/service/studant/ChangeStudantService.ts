import { hash } from "bcryptjs";
import prismaClient from "../../prisma";

interface StudantChangeRequest {
  studantID: string;
  name: string;
  password: string;
  teamID: string;
  active: boolean | null;
}

class ChangeStudantService {
  async execute({
    studantID,
    name,
    password,
    teamID,
    active,
  }: StudantChangeRequest) {
    // verificação e busca na table Studant

    const studant = await prismaClient.studant.findUnique({
      where: {
        id: studantID,
      },
    });

    if (!studant) {
      throw new Error("studant not found.");
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

    // verificação e busca na table StudantsOnTeams

    const studantsOnTeams = await prismaClient.studantsOnTeams.findFirst({
      where: {
        studantID: studant.id,
      },
    });

    if (!studantsOnTeams) {
      throw new Error("studant not found on table studantsOnTeams.");
    }

    // Alteração do aluno

    const changeStudant = await prismaClient.studant.update({
      where: {
        id: studant.id,
      },
      data: {
        name: name === "" ? studant.name : name,
        password: password === "" ? studant.password : passwordHash,
        active: active === null ? studant.active : active,
        teams: {
          updateMany: {
            where: {
              studantID: studant.id,
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

    return changeStudant;
  }
}

export { ChangeStudantService };
