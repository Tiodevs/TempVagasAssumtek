import { Request, Response } from "express"
import { DetailsByIdUserService } from "../services/adm/DetailsByIdUserService";
import { ListAllCandidateService } from "../services/adm/ListAllCandidateService";

export class DetailsByIdUserController {
    async handle(req: Request, res: Response) {
        
        try {
            const { id } = req.params

            // Cria uma instancia do service
            const detailsUserService = new DetailsByIdUserService();

            //  Chama o metodo execute do service que foi instanciado e passa os dados do body
            const userDetails = await detailsUserService.execute({ id });
            return res.json(userDetails);

        } catch (error: any) {
            console.error("Erro ao buscar detalhes do usuário:", error.message, error.stack);
            return res.status(500).json({
                status: "error",
                message: error.message || "Erro interno no servidor."
            });
        }
    }
}

export class ListAllCandidateController {
    async handle(req: Request, res: Response) {
        try {
            console.log("Iniciando listagem de candidatos");

            // Cria uma instancia do service
            const listAllCandidateService = new ListAllCandidateService();

            //  Chama o metodo execute do service que foi instanciado
            const candidates = await listAllCandidateService.execute();
            
            console.log("Candidatos listados com sucesso");
            return res.json(candidates);

        } catch (error: any) {
            console.error("Erro ao listar candidatos:", error.message, error.stack);
            return res.status(500).json({
                status: "error",
                message: error.message || "Erro interno no servidor."
            });
        }
    }
}
