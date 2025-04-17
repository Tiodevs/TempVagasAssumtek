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
exports.CreateJobController = void 0;
const CreateJobService_1 = require("../../services/job/CreateJobService");
class CreateJobController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Iniciando criação de job");
                // Pega as informações do body
                const { title, description, requirements, location, department } = req.body;
                // Cria uma instancia do service
                const createJobService = new CreateJobService_1.CreateJobService();
                //  Chama o metodo execute do service que foi instanciado e passa os dados do body
                const job = yield createJobService.execute({ title, description, requirements, location, department });
                console.log("Vaga criado com sucesso:", job);
                return res.json(job);
            }
            catch (error) {
                console.error("Erro ao criar vaga:", error.message, error.stack);
                return res.status(500).json({
                    status: "error",
                    message: error.message || "Erro interno no servidor."
                });
            }
        });
    }
}
exports.CreateJobController = CreateJobController;
