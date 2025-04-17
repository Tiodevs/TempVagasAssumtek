import prismaClient from "../../prisma"

interface EditReq {
  userId: string;
  name: string;
  email: string;
  phone: string;
}

class EditUserService {
  async execute({userId, name, email, phone}: EditReq) {
    try {
      // Validação
      if (!userId || !email || !name) {
        throw new Error("Dados insuficientes para atualização");
      }

      // Verifica se o usuário existe
      const user = await prismaClient.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      // Atualiza o usuário
      const updatedUser = await prismaClient.user.update({
        where: { id: userId },
        data: {
          name, 
          email, 
          phone,
          updated_at: new Date(),
          updatedBy: userId
        },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          type: true
        }
      });

      return updatedUser;
    } catch (error: any) {
      console.error("Erro ao atualizar usuário:", error.message);
      throw new Error(error.message || "Erro interno ao atualizar o usuário");
    }
  }
}

export { EditUserService }; 