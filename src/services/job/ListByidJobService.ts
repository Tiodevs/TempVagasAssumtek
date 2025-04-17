import prismaClient from "../../prisma"

interface JobRequest {
  jobid: string
}

class ListByidJobService {
  async execute({ jobid }: JobRequest) {

    try {
      // Validação de campos
      if (!jobid) {
        throw new Error("jobid não informado");
      }
      

      // Cria o user
      const detailsJob = await prismaClient.jobOffer.findUnique({
        where:{
          id: jobid
        }
      })

      return detailsJob

    } catch (error:any) {

      console.error("Erro ao Pegar detalhes da vaga:", error.message);
      throw new Error(error.message || "Erro interno ao Pegar detalhes da vaga");
    }
  }
}

export { ListByidJobService }