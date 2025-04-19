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
exports.ListAllCandidateService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class ListAllCandidateService {
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Lista todos os usuários do tipo candidato
                const listCandidate = yield prisma_1.default.user.findMany({
                    orderBy: {
                        created_at: "asc"
                    },
                    select: {
                        id: true,
                        is_active: true,
                        created_at: true,
                        email: true,
                        name: true,
                        phone: true,
                        candidateProfile: true,
                        type: true
                    }
                });
                return listCandidate;
            }
            catch (error) {
                console.error("Erro ao listar candidatos:", error.message);
                throw new Error(error.message || "Erro interno ao listar os candidatos");
            }
        });
    }
}
exports.ListAllCandidateService = ListAllCandidateService;
