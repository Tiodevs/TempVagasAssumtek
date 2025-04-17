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
        return __awaiter(this, arguments, void 0, function* ({ candidate_id, job_id }) {
            try {
                // Validação de campos
                if (!candidate_id) {
                    throw new Error("candidate_id não informado");
                }
                if (!job_id) {
                    throw new Error("job_id não informado");
                }
                // Cria o job application
                const jobApplication = yield prisma_1.default.jobApplication.create({
                    data: {
                        candidate_id,
                        job_id,
                    }
                });
                return jobApplication;
            }
            catch (error) {
                console.error("Erro ao criar job application:", error.message);
                throw new Error(error.message || "Erro interno ao criar o job application");
            }
        });
    }
}
exports.CreateJobApplicationService = CreateJobApplicationService;
