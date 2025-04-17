import { Request, Response } from "express";
import { EditUserService } from "../services/user/EditUserService";
import { DetailUserService } from "../services/user/DetailUserService";
import { DeleteUserService } from "../services/user/DeleteUserService";
import { AuthUserService } from "../services/user/AuthUserService";
import { CreateUserService } from "../services/user/CreateUserService";

export class EditUserController {
    async handle(req: Request, res: Response) {

        // Pega o user pelo middleware de auth
        const user_id = req.user_id

        const { name, email, phone } = req.body

        const editUserService = new EditUserService()

        console.log("Iniciar a edição")

        const editUser = await editUserService.execute({
            name, email, phone, userId: user_id
        })

        res.json(editUser)
    }
}

export class DetailUserController {
    async handle(req: Request, res: Response) {
        // Pega o user pelo middleware de auth
        const user_id = req.user_id
        console.log("User ID recebido:", user_id);

        const detailUserService = new DetailUserService()

        const user = await detailUserService.execute(user_id)

        return res.json(user)
    }
}


export class DeleteUserController {
    async handle(req: Request, res: Response) {

        const { id } = req.params

        console.log("Params recebido", id)

        const deleteUserService = new DeleteUserService()

        const deleteUser = await deleteUserService.execute(id)

        return res.json(deleteUser)
    }
}


export class CreateUserController {
    async handle(req: Request, res: Response) {
        try {
            console.log("Iniciando criação de usuário");

            // Pega as informações do body
            const { name, email, password, phone, type } = req.body;
            
            // O criador será o próprio usuário
            const createdBy = email;

            // Cria uma instancia do service
            const createUserService = new CreateUserService();

            //  Chama o metodo execute do service que foi instanciado e passa os dados do body
            const user = await createUserService.execute({ 
                name, 
                email, 
                password, 
                phone, 
                type: type || 'candidate', 
                createdBy 
            });

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


export class AuthUserController {
    async handle(req: Request, res: Response) {

        console.log("Rota de login foi chamada")

        const {email, password } = req.body

        
        const authUserService = new AuthUserService()

        const user = await authUserService.execute({
            email,
            password
        })
        
        return res.json(user)
    }
}