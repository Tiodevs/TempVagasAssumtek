import prismaClient from "../../prisma"

interface Request {
  id: string
}

class DetailsByIdUserService {
  async execute({ id }: Request) {
    try {
      // Validação de campos
      if (!id) {
        throw new Error("ID do usuário não informado");
      }

      // Buscar usuário pelo ID
      const userDetails = await prismaClient.user.findUnique({
        where: {
          id: id
        },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          type: true,
          is_active: true,
          created_at: true,
          updated_at: true,
          profile_picture: true,
          updatedBy: true,
          candidateProfile: {
            include: {
              skills: true
            }
          },
          company: true
        }
      });

      if (!userDetails) {
        throw new Error("Usuário não encontrado");
      }

      return userDetails;
    } catch (error: any) {
      console.error("Erro ao buscar detalhes do usuário:", error.message);
      throw new Error(error.message || "Erro interno ao buscar detalhes do usuário");
    }
  }
}

export { DetailsByIdUserService } 