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
exports.CreateCandidateController = void 0;
const CreateCandidateService_1 = require("../../services/user/CreateCandidateService");
class CreateCandidateController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Iniciando criação de usuário");
                // Pega as informações do body
                const { name, email, password, phone, city, state } = req.body;
                // Cria uma instancia do service
                const createCandidateService = new CreateCandidateService_1.CreateCandidateService();
                //  Chama o metodo execute do service que foi instanciado e passa os dados do body
                const user = yield createCandidateService.execute({ name, email, password, phone, city, state });
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
exports.CreateCandidateController = CreateCandidateController;
