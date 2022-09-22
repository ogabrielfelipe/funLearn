import { hash } from "bcryptjs";
import prismaClient from "../../prisma";

interface StudantRequest {
  name: string;
  register: number;
  password: string;
  active: boolean;
}

class CreateStudantService {
  async execute({ name, register, password, active }: StudantRequest) {
    if (!password) {
      throw new Error("password invalid");
    }
    const passwordHash = await hash(password, 8);

    const create = await prismaClient.studant.create({
      data: {
        name: name,
        password: passwordHash,
        register: register,
        active: active,
      },
      select: {
        id: true,
        name: true,
        register: true,
        active: true,
      },
    });

    return {
        id: create.id,
        name: create.name,
        register: create.register.toString(),
        active: create.active
    }
  }
}

export { CreateStudantService };
