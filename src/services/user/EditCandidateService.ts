import prismaClient from "../../prisma";

interface EditReq {
  candidateid: string;
  name?: string;
  email?: string;
  phone?: string;
  city?: string;
  state?: string;
}

class EditCandidateService {
  async execute({candidateid, name, email, phone, city, state }: EditReq) {

    console.log("Atualizando usuário:", name);

    // Valida os campos obrigatórios
    if (!candidateid || !email || !name || !phone || !city || !state) {
      throw new Error("Campos obrigatórios não foram fornecidos");
    }

    // Busca o usuário pelo ID
    const user = await prismaClient.candidate.findUnique({
      where: { id: candidateid },
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    console.log("Usuário encontrado, atualizando...");

    // Atualiza os dados do usuário
    const updatedUser = await prismaClient.candidate.update({
      where: { id: candidateid },
      data: {id:candidateid, name, email, phone, city, state},
    });

    console.log("Candidato atualizado com sucesso:", updatedUser);

    return updatedUser;
  }
}

export { EditCandidateService };