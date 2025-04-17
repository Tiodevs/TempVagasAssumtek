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
      
      // Verifica se o usuário existe
      const user = await prismaClient.user.findUnique({
        where: {
          id,
          is_active: true
        }
      });

      if (!user) {
        throw new Error("Usuário não encontrado ou não está ativo");
      }

      // Buscar candidaturas do usuário com detalhes das vagas
      const listJobApplications = await prismaClient.jobApplication.findMany({
        where: {
          candidate_id: id
        },
        include: {
          job_offer: {
            select: {
              id: true,
              title: true,
              description: true,
              requirements: true,
              location: true,
              department: true,
              created_at: true,
              is_active: true
            }
          }
        },
        orderBy: {
          applied_at: "desc"
        }
      });

      return listJobApplications;
    } catch (error:any) {
      console.error("Erro ao buscar candidaturas do usuário:", error.message);
      throw new Error(error.message || "Erro interno ao buscar candidaturas do usuário");
    }
  }
}

export { ListByCandidateJobService }