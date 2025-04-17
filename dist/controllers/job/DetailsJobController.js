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
exports.DetailsJobController = void 0;
const ListByidJobService_1 = require("../../services/job/ListByidJobService");
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
