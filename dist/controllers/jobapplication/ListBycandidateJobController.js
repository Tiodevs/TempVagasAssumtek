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
exports.ListBycandidateJobController = void 0;
const ListByCandidateJobService_1 = require("../../services/jobapplication/ListByCandidateJobService");
class ListBycandidateJobController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Iniciando listagem by id candidate de job");
                // Pega as informações do body
                const { candidateid } = req.body;
                // Cria uma instancia do service
                const listByCandidateJobService = new ListByCandidateJobService_1.ListByCandidateJobService();
                //  Chama o metodo execute do service que foi instanciado e passa os dados do body
                const jobByCandidate = yield listByCandidateJobService.execute({ candidateid });
                console.log("Pegar vagas do candidado:");
                return res.json(jobByCandidate);
            }
            catch (error) {
                console.error("Erro ao Pegar vagas do candidado:", error.message, error.stack);
                return res.status(500).json({
                    status: "error",
                    message: error.message || "Erro interno no servidor."
                });
            }
        });
    }
}
exports.ListBycandidateJobController = ListBycandidateJobController;
