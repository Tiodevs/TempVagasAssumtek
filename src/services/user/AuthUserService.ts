import prismaClient from "../../prisma"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"

interface AuthRequest {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password }: AuthRequest) {
    try {
      // Verifica se o usuário existe
      const user = await prismaClient.user.findFirst({
        where: {
          email: email,
          is_active: true
        }
      });

      if (!user) {
        throw new Error("Usuário/senha inválidos ou conta desativada");
      }

      // Verifica se a senha está correta
      const passwordMatch = await compare(password, user.password_hash);

      if (!passwordMatch) {
        throw new Error("Usuário/senha inválidos");
      }

      // Se deu tudo certo, gera o token
      const token = sign(
        {
          name: user.name,
          email: user.email,
          type: user.type,    
        },
        process.env.JWT_SECRET as string,
        {
          subject: user.id,
          expiresIn: '30d'
        }
      );

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        type: user.type,
        token: token
      };
    } catch (error: any) {
      console.error("Erro na autenticação:", error.message);
      throw new Error(error.message || "Erro interno durante a autenticação");
    }
  }
}

export { AuthUserService }; 