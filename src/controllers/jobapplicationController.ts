import { Request, Response } from "express"
import { CreateJobApplicationService } from "../services/jobapplication/CreateJobApplicationService";
import { ListByCandidateJobService } from "../services/jobapplication/ListByCandidateJobService";

export class CreateJobApplicationController {
    async handle(req: Request, res: Response) {
        try {
            console.log("Iniciando criação de job application");

            const { id } = req.params
            // Pega as informações do body
            const {  job_id } = req.body;

            // Cria uma instancia do service
            const createJobApplicationService = new CreateJobApplicationService();

            //  Chama o metodo execute do service que foi instanciado e passa os dados do body
            const job = await createJobApplicationService.execute({ id, job_id });
            
            console.log("Jog application criado com sucesso:", job);
            return res.json(job);

        } catch (error: any) {
            console.error("Erro ao criar job application:", error.message, error.stack);
            return res.status(500).json({
                status: "error",
                message: error.message || "Erro interno no servidor."
            });
        }
    }
}

export class ListBycandidateJobController {
    async handle(req: Request, res: Response) {
        try {
            console.log("Iniciando listagem by id candidate de job");

            // Pega as informações do body
            const { id } = req.params;

            // Cria uma instancia do service
            const listByCandidateJobService = new ListByCandidateJobService();

            //  Chama o metodo execute do service que foi instanciado e passa os dados do body
            const jobByCandidate = await listByCandidateJobService.execute({ id });
            
            console.log("Pegar vagas do candidado:");
            return res.json(jobByCandidate);

        } catch (error: any) {
            console.error("Erro ao Pegar vagas do candidado:", error.message, error.stack);
            return res.status(500).json({
                status: "error",
                message: error.message || "Erro interno no servidor."
            });
        }
    }
}
