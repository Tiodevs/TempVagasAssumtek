import { Request, Response } from "express"
import { CreateProfileService } from "../services/profile/CreateProfileService";

export class CreateProfileController {
    async handle(req: Request, res: Response) {
        try {
            console.log("Iniciando criação de profile");

            const { id } = req.params

            // Pega as informações do body
            const { summary, skills, experience, education, languages, linkedin, github, imported_from } = req.body;

            // Cria uma instancia do service
            const createProfileService = new CreateProfileService();

            //  Chama o metodo execute do service que foi instanciado e passa os dados do body
            const profile = await createProfileService.execute({ id, summary, skills, experience, education, languages, linkedin, github, imported_from });
            
            console.log("Profile criado com sucesso:", profile);
            return res.json(profile);

        } catch (error: any) {
            console.error("Erro ao criar profile:", error.message, error.stack);
            return res.status(500).json({
                status: "error",
                message: error.message || "Erro interno no servidor."
            });
        }
    }
}