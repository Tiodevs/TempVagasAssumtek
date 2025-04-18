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
          type: true,
          profile_picture: true,
          is_active: true,
          created_at: true,
          updated_at: true,
          createdBy: true,
          updatedBy: true
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