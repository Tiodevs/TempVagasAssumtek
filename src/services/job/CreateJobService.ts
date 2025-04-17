import prismaClient from "../../prisma"

interface JobRequest {
  title: string
  description: string
  requirements: string
  location: string
  department: string
}

class CreateJobService {
  async execute({ title, description, requirements, location, department }: JobRequest) {

    try {
      // Validação de campos
      if (!title) {
        throw new Error("title não informado");
      }
      if (!description) {
        throw new Error("description não informado");
      }
      if (!requirements) {
        throw new Error("requirements não informada");
      }
      if (!location) {
        throw new Error("location não informado");
      }
      if (!department) {
        throw new Error("department não informada");
      }

      // Cria o user
      const job = await prismaClient.jobOffer.create({
        data: {
          title, 
          description, 
          requirements, 
          location, 
          department
        }
      })

      return job

    } catch (error:any) {

      console.error("Erro ao criar job:", error.message);
      throw new Error(error.message || "Erro interno ao criar o candidato");
    }
  }
}

export { CreateJobService }