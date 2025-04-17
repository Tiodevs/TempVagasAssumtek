import prismaClient from "../../prisma"

class ListJobService {
  async execute() {

    try {

      // Lista todos os users
      const listjob = await prismaClient.jobOffer.findMany({
        orderBy:{
          created_at:"asc"
        }
      })

      return listjob

    } catch (error:any) {

      console.error("Erro ao listar job:", error.message);
      throw new Error(error.message || "Erro interno ao listar o jobs");
    }
  }
}

export { ListJobService }