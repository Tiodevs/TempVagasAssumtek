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
exports.CreateJobService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class CreateJobService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ title, description, requirements, location, department, createdBy }) {
            try {
                // Validação de campos
                if (!title) {
                    throw new Error("title não informado");
                }
                if (!description) {
                    throw new Error("description não informado");
                }
                if (!requirements) {
                    throw new Error("requirements não informada");
                }
                if (!location) {
                    throw new Error("location não informado");
                }
                if (!department) {
                    throw new Error("department não informada");
                }
                if (!createdBy) {
                    throw new Error("createdBy não informado");
                }
                // Cria a vaga
                const job = yield prisma_1.default.jobOffer.create({
                    data: {
                        title,
                        description,
                        requirements,
                        location,
                        department,
                        createdBy,
                        is_active: true
                    }
                });
                return job;
            }
            catch (error) {
                console.error("Erro ao criar vaga:", error.message);
                throw new Error(error.message || "Erro interno ao criar a vaga");
            }
        });
    }
}
exports.CreateJobService = CreateJobService;
