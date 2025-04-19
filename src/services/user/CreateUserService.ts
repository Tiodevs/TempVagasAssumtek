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
          id: true,
          name: true,
          email: true,
          phone: true,
          type: true,
          profile_picture: true,
          is_active: true,
          created_at: true,
          updated_at: true,
          createdBy: true,
          updatedBy: true
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