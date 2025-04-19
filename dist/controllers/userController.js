"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserController = exports.CreateUserController = exports.DeleteUserController = exports.DetailUserController = exports.EditUserController = void 0;
const EditUserService_1 = require("../services/user/EditUserService");
const DetailUserService_1 = require("../services/user/DetailUserService");
const DeleteUserService_1 = require("../services/user/DeleteUserService");
const AuthUserService_1 = require("../services/user/AuthUserService");
const CreateUserService_1 = require("../services/user/CreateUserService");
class EditUserController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Pega o user pelo middleware de auth
            const user_id = req.user_id;
            const { name, email, phone } = req.body;
            const editUserService = new EditUserService_1.EditUserService();
            console.log("Iniciar a edição");
            const editUser = yield editUserService.execute({
                name, email, phone, userId: user_id
            });
            res.json(editUser);
        });
    }
}
exports.EditUserController = EditUserController;
class DetailUserController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Pega o user pelo middleware de auth
            const user_id = req.user_id;
            console.log("User ID recebido:", user_id);
            const detailUserService = new DetailUserService_1.DetailUserService();
            const user = yield detailUserService.execute(user_id);
            return res.json(user);
        });
    }
}
exports.DetailUserController = DetailUserController;
class DeleteUserController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            console.log("Params recebido", id);
            const deleteUserService = new DeleteUserService_1.DeleteUserService();
            const deleteUser = yield deleteUserService.execute(id);
            return res.json(deleteUser);
        });
    }
}
exports.DeleteUserController = DeleteUserController;
class CreateUserController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Iniciando criação de usuário");
                // Pega as informações do body
                const { name, email, password, phone, type } = req.body;
                // O criador será o próprio usuário
                const createdBy = email;
                // Cria uma instancia do service
                const createUserService = new CreateUserService_1.CreateUserService();
                //  Chama o metodo execute do service que foi instanciado e passa os dados do body
                const user = yield createUserService.execute({
                    name,
                    email,
                    password,
                    phone,
                    type: type || 'candidate',
                    createdBy
                });
                console.log("Usuário criado com sucesso:", user);
                return res.json(user);
            }
            catch (error) {
                console.error("Erro ao criar usuário:", error.message, error.stack);
                return res.status(500).json({
                    status: "error",
                    message: error.message || "Erro interno no servidor."
                });
            }
        });
    }
}
exports.CreateUserController = CreateUserController;
class AuthUserController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Rota de login foi chamada");
            const { email, password } = req.body;
            const authUserService = new AuthUserService_1.AuthUserService();
            const user = yield authUserService.execute({
                email,
                password
            });
            return res.json(user);
        });
    }
}
exports.AuthUserController = AuthUserController;
