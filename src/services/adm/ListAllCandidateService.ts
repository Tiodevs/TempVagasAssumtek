import prismaClient from "../../prisma"

class ListAllCandidateService {
  async execute() {
    try {
      // Lista todos os usuários do tipo candidato
      const listCandidate = await prismaClient.user.findMany({
        orderBy:{
          created_at: "asc"
        },
        select:{
          id: true,
          is_active: true,
          created_at: true,
          email: true,
          name: true,
          phone: true,
          candidateProfile: true,
          type: true
        }
      });

      return listCandidate;
    } catch (error:any) {
      console.error("Erro ao listar candidatos:", error.message);
      throw new Error(error.message || "Erro interno ao listar os candidatos");
    }
  }
}

export { ListAllCandidateService } 