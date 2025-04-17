import prismaClient from "../../prisma"

interface JobRequest {
  title: string
  description: string
  requirements: string
  location: string
  department: string
  createdBy: string
}

class CreateJobService {
  async execute({ title, description, requirements, location, department, createdBy }: JobRequest) {

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
      if (!createdBy) {
        throw new Error("createdBy não informado");
      }

      // Cria a vaga
      const job = await prismaClient.jobOffer.create({
        data: {
          title, 
          description, 
          requirements, 
          location, 
          department,
          createdBy,
          is_active: true
        }
      })

      return job

    } catch (error:any) {
      console.error("Erro ao criar vaga:", error.message);
      throw new Error(error.message || "Erro interno ao criar a vaga");
    }
  }
}

export { CreateJobService }