import prismaClient from "../../prisma"

interface ProfileRequest {
  id: string
  summary: string
  skills: {name: string}[]
  experience: object
  education: object
  languages: object
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
      
      // Validações essenciais, tornando os outros campos opcionais
      if (!languages) {
        throw new Error("languages não informado");
      }

      // Verifica se o usuário existe
      const userExists = await prismaClient.user.findUnique({
        where: {
          id: id
        }
      });

      if (!userExists) {
        throw new Error("Usuário não encontrado");
      }

      // Verifica se já existe perfil para este usuário
      const profileExists = await prismaClient.candidateProfile.findFirst({
        where: {
          userId: id
        }
      });

      if (profileExists) {
        throw new Error("Perfil já criado para este usuário");
      }

      // Cria o perfil do candidato com transação para garantir a criação de habilidades
      const result = await prismaClient.$transaction(async (tx) => {
        // Cria o perfil
        const profile = await tx.candidateProfile.create({
          data: {
            userId: id,
            summary,
            experience,
            education,
            languages,
            linkedin,
            github,
            imported_from,
          }
        });

        // Se houver habilidades, cria cada uma delas
        if (skills && skills.length > 0) {
          for (const skill of skills) {
            await tx.skill.create({
              data: {
                name: skill.name,
                candidateProfileId: profile.id
              }
            });
          }
        }

        // Retorna o perfil com as habilidades criadas
        return await tx.candidateProfile.findUnique({
          where: { id: profile.id },
          include: { skills: true }
        });
      });

      return result;

    } catch (error:any) {
      console.error("Erro ao criar perfil de candidato:", error.message);
      throw new Error(error.message || "Erro interno ao criar o perfil de candidato");
    }
  }
}

export { CreateProfileService }