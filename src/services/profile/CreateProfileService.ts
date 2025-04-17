import prismaClient from "../../prisma"

interface ProfileRequest {
  id: string
  summary: string
  skills: []
  experience: string
  education: string
  languages: []
  linkedin: string
  github: string
  imported_from: string
}

class CreateProfileService {
  async execute({ id, summary, skills, experience, education, languages, linkedin, github, imported_from }: ProfileRequest) {

    try {
      // Validação de campos
      if (!id) {
        throw new Error("id não informado");
      }
      if (!summary) {
        throw new Error("summary não informado");
      }
      if (!skills) {
        throw new Error("skills não informada");
      }
      if (!experience) {
        throw new Error("experience não informado");
      }
      if (!education) {
        throw new Error("education não informada");
      }
      if (!languages) {
        throw new Error("languages não informado");
      }
      if (!linkedin) {
        throw new Error("linkedin não informado");
      }
      if (!github) {
        throw new Error("github não informado");
      }
      if (!imported_from) {
        throw new Error("imported_from não informado");
      }

      // Verifica se já existe o use com o email
      const profileExists = await prismaClient.candidateProfile.findFirst({
        where: {
          candidate_id: id
        }
      })

      if (profileExists) {
        throw new Error("Profile já criado")
      }

      // Cria o user
      const profile = await prismaClient.candidateProfile.create({
        data: {
          candidate_id: id, 
          summary, 
          skills, 
          experience, 
          education, 
          languages, 
          linkedin, 
          github, 
          imported_from
        }
      })

      return profile

    } catch (error:any) {

      console.error("Erro ao criar candidato:", error.message);
      throw new Error(error.message || "Erro interno ao criar o candidato");
    }
  }
}

export { CreateProfileService }