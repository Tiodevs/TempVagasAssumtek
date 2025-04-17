import { Request, Response } from "express"
import { DetalisByIdCandidateService } from "../services/adm/DetalisByIdCandidateService";
import { ListAllCandidadeService } from "../services/adm/ListAllCandidadeService";

export class DetalisByIdCandidateController {
    async handle(req: Request, res: Response) {
        
        try {

            const { id } = req.params

            // Cria uma instancia do service
            const detalisCandidateService = new DetalisByIdCandidateService();

            //  Chama o metodo execute do service que foi instanciado e passa os dados do body
            const detalisCandidate = await detalisCandidateService.execute({ id });
            return res.json(detalisCandidate);

        } catch (error: any) {
            console.error("Erro ao Pegar datalhes do candidado:", error.message, error.stack);
            return res.status(500).json({
                status: "error",
                message: error.message || "Erro interno no servidor."
            });
        }
    }
}

export class ListAllCandidadeController {
    async handle(req: Request, res: Response) {
        try {
            console.log("Iniciando listagem de Candidatos");

            // Cria uma instancia do service
            const listAllCandidadeervice = new ListAllCandidadeService();

            //  Chama o metodo execute do service que foi instanciado e passa os dados do body
            const listAllcCandidates = await listAllCandidadeervice.execute();
            
            console.log("Candidatos listados com sucesso");
            return res.json(listAllcCandidates);

        } catch (error: any) {
            console.error("Erro ao listar Candidatos:", error.message, error.stack);
            return res.status(500).json({
                status: "error",
                message: error.message || "Erro interno no servidor."
            });
        }
    }
}
