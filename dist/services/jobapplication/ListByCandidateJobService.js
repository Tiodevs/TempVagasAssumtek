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
exports.ListByCandidateJobService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class ListByCandidateJobService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id }) {
            try {
                // Validação de campos
                if (!id) {
                    throw new Error("id não informado");
                }
                // Verifica se o usuário existe
                const user = yield prisma_1.default.user.findUnique({
                    where: {
                        id,
                        is_active: true
                    }
                });
                if (!user) {
                    throw new Error("Usuário não encontrado ou não está ativo");
                }
                // Buscar candidaturas do usuário com detalhes das vagas
                const listJobApplications = yield prisma_1.default.jobApplication.findMany({
                    where: {
                        candidate_id: id
                    },
                    include: {
                        job_offer: {
                            select: {
                                id: true,
                                title: true,
                                description: true,
                                requirements: true,
                                location: true,
                                department: true,
                                created_at: true,
                                is_active: true
                            }
                        }
                    },
                    orderBy: {
                        applied_at: "desc"
                    }
                });
                return listJobApplications;
            }
            catch (error) {
                console.error("Erro ao buscar candidaturas do usuário:", error.message);
                throw new Error(error.message || "Erro interno ao buscar candidaturas do usuário");
            }
        });
    }
}
exports.ListByCandidateJobService = ListByCandidateJobService;
