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
exports.CreateJobApplicationService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class CreateJobApplicationService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, job_id }) {
            try {
                // Validação de campos
                if (!id) {
                    throw new Error("id não informado");
                }
                if (!job_id) {
                    throw new Error("job_id não informado");
                }
                // Verifica se o usuário existe e é um candidato
                const user = yield prisma_1.default.user.findUnique({
                    where: {
                        id,
                        type: 'candidate',
                        is_active: true
                    }
                });
                if (!user) {
                    throw new Error("Usuário não encontrado ou não é um candidato ativo");
                }
                // Verifica se a vaga existe
                const jobOffer = yield prisma_1.default.jobOffer.findUnique({
                    where: {
                        id: job_id,
                        is_active: true
                    }
                });
                if (!jobOffer) {
                    throw new Error("Vaga não encontrada ou não está ativa");
                }
                // Cria o job application
                const jobApplication = yield prisma_1.default.jobApplication.create({
                    data: {
                        candidate_id: id,
                        job_id,
                    }
                });
                return jobApplication;
            }
            catch (error) {
                console.error("Erro ao criar candidatura:", error.message);
                throw new Error(error.message || "Erro interno ao criar a candidatura");
            }
        });
    }
}
exports.CreateJobApplicationService = CreateJobApplicationService;
