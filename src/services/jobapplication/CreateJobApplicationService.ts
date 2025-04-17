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

      // Cria o job application
      const jobApplication = await prismaClient.jobApplication.create({
        data: {
          candidate_id:id, 
          job_id,
        }
      })

      return jobApplication

    } catch (error:any) {

      console.error("Erro ao criar job application:", error.message);
      throw new Error(error.message || "Erro interno ao criar o job application");
    }
  }
}

export { CreateJobApplicationService }