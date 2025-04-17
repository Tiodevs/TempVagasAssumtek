import prismaClient from "../../prisma"

class DeleteUserService {
  async execute(id: string) {
    try {
      if (!id) {
        throw new Error("ID não informado");
      }

      // Verifica se o usuário existe
      const user = await prismaClient.user.findUnique({
        where: { id }
      });

      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      // Desativa o usuário em vez de excluir
      const deactivatedUser = await prismaClient.user.update({
        where: { id },
        data: {
          is_active: false,
          updated_at: new Date()
        }
      });

      return { message: "Usuário desativado com sucesso" };
    } catch (error: any) {
      console.error("Erro ao desativar usuário:", error.message);
      throw new Error(error.message || "Erro interno ao desativar o usuário");
    }
  }
}

export { DeleteUserService }; 