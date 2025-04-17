import prismaClient from "../../prisma";

class DeleteCandidateService {
    
    async execute(id: string) {
        const user = await prismaClient.candidate.update({
            where: { id: id },
            data:{
                active: false
            }
        })

        return user
    }
}

export { DeleteCandidateService }