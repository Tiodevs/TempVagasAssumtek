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
exports.ListAllCandidadeController = void 0;
const ListAllCandidadeService_1 = require("../../services/adm/ListAllCandidadeService");
class ListAllCandidadeController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Iniciando listagem de Candidatos");
                // Cria uma instancia do service
                const listAllCandidadeervice = new ListAllCandidadeService_1.ListAllCandidadeService();
                //  Chama o metodo execute do service que foi instanciado e passa os dados do body
                const listAllcCandidates = yield listAllCandidadeervice.execute();
                console.log("Candidatos listados com sucesso");
                return res.json(listAllcCandidates);
            }
            catch (error) {
                console.error("Erro ao listar Candidatos:", error.message, error.stack);
                return res.status(500).json({
                    status: "error",
                    message: error.message || "Erro interno no servidor."
                });
            }
        });
    }
}
exports.ListAllCandidadeController = ListAllCandidadeController;
