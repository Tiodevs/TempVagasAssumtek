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
exports.ListAllCandidateController = exports.DetailsByIdUserController = void 0;
const DetailsByIdUserService_1 = require("../services/adm/DetailsByIdUserService");
const ListAllCandidateService_1 = require("../services/adm/ListAllCandidateService");
class DetailsByIdUserController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                // Cria uma instancia do service
                const detailsUserService = new DetailsByIdUserService_1.DetailsByIdUserService();
                //  Chama o metodo execute do service que foi instanciado e passa os dados do body
                const userDetails = yield detailsUserService.execute({ id });
                return res.json(userDetails);
            }
            catch (error) {
                console.error("Erro ao buscar detalhes do usuário:", error.message, error.stack);
                return res.status(500).json({
                    status: "error",
                    message: error.message || "Erro interno no servidor."
                });
            }
        });
    }
}
exports.DetailsByIdUserController = DetailsByIdUserController;
class ListAllCandidateController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Iniciando listagem de candidatos");
                // Cria uma instancia do service
                const listAllCandidateService = new ListAllCandidateService_1.ListAllCandidateService();
                //  Chama o metodo execute do service que foi instanciado
                const candidates = yield listAllCandidateService.execute();
                console.log("Candidatos listados com sucesso");
                return res.json(candidates);
            }
            catch (error) {
                console.error("Erro ao listar candidatos:", error.message, error.stack);
                return res.status(500).json({
                    status: "error",
                    message: error.message || "Erro interno no servidor."
                });
            }
        });
    }
}
exports.ListAllCandidateController = ListAllCandidateController;
