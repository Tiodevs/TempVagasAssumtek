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
exports.ListJobController = exports.DetailsJobController = exports.CreateJobController = void 0;
const CreateJobService_1 = require("../services/job/CreateJobService");
const ListByidJobService_1 = require("../services/job/ListByidJobService");
const ListJobService_1 = require("../services/job/ListJobService");
class CreateJobController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Iniciando criação de vaga");
                // Pega o ID do usuário autenticado
                const createdBy = req.user_id;
                // Pega as informações do body
                const { title, description, requirements, location, department } = req.body;
                // Cria uma instancia do service
                const createJobService = new CreateJobService_1.CreateJobService();
                //  Chama o metodo execute do service que foi instanciado e passa os dados do body
                const job = yield createJobService.execute({
                    title,
                    description,
                    requirements,
                    location,
                    department,
                    createdBy
                });
                console.log("Vaga criada com sucesso:", job);
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
class DetailsJobController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Iniciando listagem by id de job");
                // Pega as informações do body
                const { jobid } = req.body;
                // Cria uma instancia do service
                const listByidJobService = new ListByidJobService_1.ListByidJobService();
                //  Chama o metodo execute do service que foi instanciado e passa os dados do body
                const jobdetials = yield listByidJobService.execute({ jobid });
                console.log("Pegar detalhes da vaga com sucesso:");
                return res.json(jobdetials);
            }
            catch (error) {
                console.error("Erro ao pegar detalhes da vaga:", error.message, error.stack);
                return res.status(500).json({
                    status: "error",
                    message: error.message || "Erro interno no servidor."
                });
            }
        });
    }
}
exports.DetailsJobController = DetailsJobController;
class ListJobController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Iniciando listagem de vagas");
                // Cria uma instancia do service
                const listJobService = new ListJobService_1.ListJobService();
                //  Chama o metodo execute do service que foi instanciado
                const listJob = yield listJobService.execute();
                console.log("Vagas listadas com sucesso");
                return res.json(listJob);
            }
            catch (error) {
                console.error("Erro ao listar vagas:", error.message, error.stack);
                return res.status(500).json({
                    status: "error",
                    message: error.message || "Erro interno no servidor."
                });
            }
        });
    }
}
exports.ListJobController = ListJobController;
