import prismaClient from "../../prisma"

interface JobApplicationRequest {
  id: string
  job_id: string
}

class CreateJobApplicationService {
  async execute({ id, job_id }: JobApplicationRequest) {
    try {
      // Validação de campos
      if (!id) {
        throw new Error("id não informado");
      }
      if (!job_id) {
        throw new Error("job_id não informado");
      }

      // Verifica se o usuário existe e é um candidato
      const user = await prismaClient.user.findUnique({
        where: {
          id,
          type: 'candidate',
          is_active: true
        }
      });

      if (!user) {
        throw new Error("Usuário não encontrado ou não é um candidato ativo");
      }

      // Verifica se a vaga existe
      const jobOffer = await prismaClient.jobOffer.findUnique({
        where: {
          id: job_id,
          is_active: true
        }
      });

      if (!jobOffer) {
        throw new Error("Vaga não encontrada ou não está ativa");
      }

      // Cria o job application
      const jobApplication = await prismaClient.jobApplication.create({
        data: {
          candidate_id: id, 
          job_id,
        }
      });

      return jobApplication;
    } catch (error:any) {
      console.error("Erro ao criar candidatura:", error.message);
      throw new Error(error.message || "Erro interno ao criar a candidatura");
    }
  }
}

export { CreateJobApplicationService }