import { hash } from 'bcryptjs'
import prismaClient from "../../prisma"

interface UserRequest {
  name: string
  email: string
  password: string
  phone: string
  type: string
  createdBy: string
}

class CreateUserService {
  async execute({ name, email, password, phone, type, createdBy }: UserRequest) {

    try {
      // Validação de campos
      if (!name) {
        throw new Error("Nome incorreto");
      }
      if (!email) {
        throw new Error("Email não informado");
      }
      if (!password) {
        throw new Error("Senha não informada");
      }
      if (!phone) {
        throw new Error("Número não informado");
      }
      if (!type) {
        throw new Error("Tipo de usuário não informado");
      }
      if (!createdBy) {
        throw new Error("Campo createdBy não informado");
      }

      // Expressão regular que verifica se é email
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!email || !emailRegex.test(email)) {
        throw new Error("Email inválido");
      }

      // Verifica se já existe o usuário com o email
      const userExists = await prismaClient.user.findFirst({
        where: {
          email: email
        }
      })

      if (userExists) {
        throw new Error("Usuário já cadastrado")
      }

      // Cria a criptografia da senha
      const hashedPassword = await hash(password, 10)

      // Cria o usuário
      const user = await prismaClient.user.create({
        data: {
          name,
          email,
          password_hash: hashedPassword,
          phone,
          type, // 'candidate', 'company', 'admin'
          is_active: true,
          createdBy
        },
        select: {
          name: true,
          email: true,
          id: true,
          type: true
        }
      })

      return user

    } catch (error:any) {
      console.error("Erro ao criar usuário:", error.message);
      throw new Error(error.message || "Erro interno ao criar o usuário");
    }
  }
}

export { CreateUserService } 