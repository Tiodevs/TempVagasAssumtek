import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"

import prismaClient from "../../prisma"

interface User {
    email: string
    password: string
}

class AuthCandidateService {
    async execute({ email, password }: User) {

        try {
            // Valida os campos
            if (!email) {
                console.log("Senha não foi enviada")
                throw new Error("Senha não foi enviada")
            }
            if (!password) {
                console.log("Senha não foi enviada")
                throw new Error("Senha não foi enviada")
            }

            // Verifica se tem um candidato com o email cadastrado
            const user = await prismaClient.candidate.findFirst({
                where: {
                    email: email
                }
            })

            // Se não tiver da erro
            if (!user) {
                console.log("Nelhum user encontrado com esse email")
                throw new Error("Email ou senha incorretos")
            }

            // Ele faz a verificação se a senha criptografada é a mesma enviada pelo user
            const passwordMatch = await compare(password, user.password_hash)

            if (!passwordMatch) {
                console.log("Senha invalida")
                throw new Error("Email ou senha incorretos")
            }

            // Gera um token JWT, armazena o nome e email do candidato
            const token = sign(
                {
                    name: user.name,
                    email: user.email
                },
                process.env.JWT_SECRET,
                {
                    subject: user.id,
                    expiresIn: '1d'
                }
            )


            return {
                id: user.id,
                name: user.name,
                email: user.email,
                token
            }

        } catch (error: any) {
            console.error("Erro ao logar o candidato:", error.message);
            throw new Error(error.message || "Erro interno ao logar o candidato");
        }

    }
}

export { AuthCandidateService }