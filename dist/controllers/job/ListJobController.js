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
exports.ListJobController = void 0;
const ListJobService_1 = require("../../services/job/ListJobService");
class ListJobController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Iniciando listagem de job");
                // Cria uma instancia do service
                const listJobService = new ListJobService_1.ListJobService();
                //  Chama o metodo execute do service que foi instanciado e passa os dados do body
                const listJob = yield listJobService.execute();
                console.log("Vaga listadas com sucesso:");
                return res.json(listJob);
            }
            catch (error) {
                console.error("Erro ao listar vaga:", error.message, error.stack);
                return res.status(500).json({
                    status: "error",
                    message: error.message || "Erro interno no servidor."
                });
            }
        });
    }
}
exports.ListJobController = ListJobController;
