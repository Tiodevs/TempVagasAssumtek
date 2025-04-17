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
exports.ListByidJobService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class ListByidJobService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ jobid }) {
            try {
                // Validação de campos
                if (!jobid) {
                    throw new Error("jobid não informado");
                }
                // Cria o user
                const detailsJob = yield prisma_1.default.jobOffer.findUnique({
                    where: {
                        id: jobid
                    }
                });
                return detailsJob;
            }
            catch (error) {
                console.error("Erro ao Pegar detalhes da vaga:", error.message);
                throw new Error(error.message || "Erro interno ao Pegar detalhes da vaga");
            }
        });
    }
}
exports.ListByidJobService = ListByidJobService;
