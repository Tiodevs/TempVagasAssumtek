import prismaClient from "../../prisma"

class ListAllCandidadeService {
  async execute() {

    try {

      // Lista todos os users
      const listCandidate = await prismaClient.candidate.findMany({
        orderBy:{
          created_at:"asc"
        },
        select:{
          id: true,
          active: true,
          city: true,
          created_at: true,
          email: true,
          name: true,
          phone: true,
          profile: true,
          state: true,
        }
      })

      return listCandidate

    } catch (error:any) {

      console.error("Erro ao listar candidate:", error.message);
      throw new Error(error.message || "Erro interno ao listar o candidate");
    }
  }
}

export { ListAllCandidadeService }