import prismaClient from "../../prisma"

interface JobRequest {
  id: string
}

class ListByCandidateJobService {
  async execute({ id }: JobRequest) {

    try {
      // Validação de campos
      if (!id) {
        throw new Error("id não informado");
      }
      

      // Pegar candidayuras dos pcandidatos
      const listJobCandidate = await prismaClient.jobApplication.findMany({
        where:{
          candidate_id: id
        }
      })

      return listJobCandidate

    } catch (error:any) {

      console.error("Erro ao Pegar vagas do candidado:", error.message);
      throw new Error(error.message || "Erro interno ao Pegar vagas do candidado");
    }
  }
}

export { ListByCandidateJobService }