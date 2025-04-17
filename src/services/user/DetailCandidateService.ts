import prismaClient from "../../prisma";

class DetailCandidateService {
    async execute(id: string) {
        const user = await prismaClient.candidate.findFirst({
            where: { id: id },
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

        return user
    }
}

export { DetailCandidateService }