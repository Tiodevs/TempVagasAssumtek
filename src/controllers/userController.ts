import { Request, Response } from "express";
import { EditCandidateService } from "../services/user/EditCandidateService";
import { DetailCandidateService } from "../services/user/DetailCandidateService";
import { DeleteCandidateService } from "../services/user/DeleteCandidateService";
import { CreateCandidateService } from "../services/user/CreateCandidateService";
import { AuthCandidateService } from "../services/user/AuthCandidateService";

export class EditCandidateController {
    async handle(req: Request, res: Response) {

        // Pega o user pelo middleware de auth
        const user_id = req.user_id

        const { name, email, phone, city, state } = req.body

        const editCandidateService = new EditCandidateService()

        console.log("Iniciar a edição")

        const editCandidate = await editCandidateService.execute({
            name, email, phone, city, state, candidateid: user_id
        })

        res.json(editCandidate)
    }
}

export class DetailCandidateController {
    async handle(req: Request, res: Response) {

        // Pega o user pelo middleware de auth
        const { id } = req.params

        const detailCandidateService = new DetailCandidateService()

        const candidate = await detailCandidateService.execute(id)

        return res.json(candidate)
    }
}


export class DeleteCandidateController {
    async handle(req: Request, res: Response) {

        const { id } = req.params

        console.log("Parms recebido", id)

        const deleteCandidateService = new DeleteCandidateService()

        const deleteCandidate = await deleteCandidateService.execute(id)

        return res.json(deleteCandidate)
    }
}


export class CreateCandidateController {
    async handle(req: Request, res: Response) {
        try {
            console.log("Iniciando criação de usuário");

            // Pega as informações do body
            const { name, email, password, phone, city, state } = req.body;

            // Cria uma instancia do service
            const createCandidateService = new CreateCandidateService();

            //  Chama o metodo execute do service que foi instanciado e passa os dados do body
            const user = await createCandidateService.execute({ name, email, password, phone, city, state });

            console.log("Usuário criado com sucesso:", user);
            return res.json(user);

        } catch (error: any) {
            console.error("Erro ao criar usuário:", error.message, error.stack);
            return res.status(500).json({
                status: "error",
                message: error.message || "Erro interno no servidor."
            });
        }
    }
}


export class AuthCandidateController {
    async handle(req: Request, res: Response) {

        console.log("Rota de login foi chamada")

        const {email, password } = req.body

        
        const authCandidateService = new AuthCandidateService()

        const user = await authCandidateService.execute({
            email,
            password
        })
        
        return res.json(user)
    }
  }