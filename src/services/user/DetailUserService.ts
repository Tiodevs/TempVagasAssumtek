import prismaClient from "../../prisma"

class DetailUserService {
  async execute(id?: string) {
    try {
      // Se não tiver ID, retorna erro
      if (!id) {
        throw new Error("ID não informado");
      }

      const user = await prismaClient.user.findFirst({
        where: {
          id: id
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

      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      return user;
    } catch (error: any) {
      console.error("Erro ao buscar detalhes do usuário:", error.message);
      throw new Error(error.message || "Erro interno ao buscar os detalhes do usuário");
    }
  }
}

export { DetailUserService }; 