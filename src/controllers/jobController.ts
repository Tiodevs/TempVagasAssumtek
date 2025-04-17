import { Request, Response } from "express"
import { CreateJobService } from "../services/job/CreateJobService";
import { ListByidJobService } from "../services/job/ListByidJobService";
import { ListJobService } from "../services/job/ListJobService";

export class CreateJobController {
    async handle(req: Request, res: Response) {
        try {
            console.log("Iniciando criação de vaga");

            // Pega o ID do usuário autenticado
            const createdBy = req.user_id;

            // Pega as informações do body
            const { title, description, requirements, location, department } = req.body;

            // Cria uma instancia do service
            const createJobService = new CreateJobService();

            //  Chama o metodo execute do service que foi instanciado e passa os dados do body
            const job = await createJobService.execute({ 
                title, 
                description, 
                requirements, 
                location, 
                department, 
                createdBy 
            });
            
            console.log("Vaga criada com sucesso:", job);
            return res.json(job);

        } catch (error: any) {
            console.error("Erro ao criar vaga:", error.message, error.stack);
            return res.status(500).json({
                status: "error",
                message: error.message || "Erro interno no servidor."
            });
        }
    }
}

export class DetailsJobController {
    async handle(req: Request, res: Response) {
        try {
            console.log("Iniciando listagem by id de job");

            // Pega as informações do body
            const { jobid } = req.body;

            // Cria uma instancia do service
            const listByidJobService = new ListByidJobService();

            //  Chama o metodo execute do service que foi instanciado e passa os dados do body
            const jobdetials = await listByidJobService.execute({ jobid });
            
            console.log("Pegar detalhes da vaga com sucesso:");
            return res.json(jobdetials);

        } catch (error: any) {
            console.error("Erro ao pegar detalhes da vaga:", error.message, error.stack);
            return res.status(500).json({
                status: "error",
                message: error.message || "Erro interno no servidor."
            });
        }
    }
}


export class ListJobController {
    async handle(req: Request, res: Response) {
        try {
            console.log("Iniciando listagem de vagas");

            // Cria uma instancia do service
            const listJobService = new ListJobService();

            //  Chama o metodo execute do service que foi instanciado
            const listJob = await listJobService.execute();
            
            console.log("Vagas listadas com sucesso");
            return res.json(listJob);

        } catch (error: any) {
            console.error("Erro ao listar vagas:", error.message, error.stack);
            return res.status(500).json({
                status: "error",
                message: error.message || "Erro interno no servidor."
            });
        }
    }
}