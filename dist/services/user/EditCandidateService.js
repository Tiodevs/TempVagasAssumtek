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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditCandidateService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class EditCandidateService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ candidateid, name, email, phone, city, state }) {
            console.log("Atualizando usuário:", name);
            // Valida os campos obrigatórios
            if (!candidateid || !email || !name || !phone || !city || !state) {
                throw new Error("Campos obrigatórios não foram fornecidos");
            }
            // Busca o usuário pelo ID
            const user = yield prisma_1.default.candidate.findUnique({
                where: { id: candidateid },
            });
            if (!user) {
                throw new Error("Usuário não encontrado");
            }
            console.log("Usuário encontrado, atualizando...");
            // Atualiza os dados do usuário
            const updatedUser = yield prisma_1.default.candidate.update({
                where: { id: candidateid },
                data: { id: candidateid, name, email, phone, city, state },
            });
            console.log("Candidato atualizado com sucesso:", updatedUser);
            return updatedUser;
        });
    }
}
exports.EditCandidateService = EditCandidateService;
