import prismaClient from "../../prisma"

interface Request {
  id: string
}

class DetalisByIdCandidateService {
  async execute({ id }: Request) {

    try {
      // Validação de campos
      if (!id) {
        throw new Error("candidateid não informado");
      }


      // Pegar candidayuras dos pcandidatos
      const detailsCandidate = await prismaClient.candidate.findMany({
        where: {
          id: id
        },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          city: true,
          state: true,
          created_at: true,
          profile: true,
          active: true
        }
      })

      return detailsCandidate

    } catch (error: any) {

      console.error("Erro ao Pegar detalhes do candidado:", error.message);
      throw new Error(error.message || "Erro interno ao Pegar detalhes do candidado");
    }
  }
}

export { DetalisByIdCandidateService }