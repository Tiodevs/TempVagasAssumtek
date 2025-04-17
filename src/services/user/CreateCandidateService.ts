import { hash, genSalt } from 'bcryptjs'
import prismaClient from "../../prisma"

interface CandidateRequest {
  name: string
  email: string
  password: string
  phone: string
  city: string
  state: string
}

class CreateCandidateService {
  async execute({ name, email, password, phone, city, state }: CandidateRequest) {

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
      if (!city) {
        throw new Error("Cidade não informada");
      }
      if (!state) {
        throw new Error("Estado não informado");
      }

      // Expressão regular que verifica se é email
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!email || !emailRegex.test(email)) {
        throw new Error("Email inválido");
      }


      // Verifica se já existe o use com o email
      const candidateExists = await prismaClient.candidate.findFirst({
        where: {
          email: email
        }
      })

      if (candidateExists) {
        throw new Error("Candidato já cadastrado")
      }

      // Cria a criptografia da senha
      const hashedPassword = await hash(password, 10)

      // Cria o user
      const user = await prismaClient.candidate.create({
        data: {
          name,
          email,
          password_hash: hashedPassword,
          phone,
          city,
          state,
        },
        select: {
          name: true,
          email: true,
          id: true
        }
      })

      return user

    } catch (error:any) {

      console.error("Erro ao criar candidato:", error.message);
      throw new Error(error.message || "Erro interno ao criar o candidato");
    }
  }
}

export { CreateCandidateService }