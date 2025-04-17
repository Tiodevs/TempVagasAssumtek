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
exports.CreateCandidateService = void 0;
const bcryptjs_1 = require("bcryptjs");
const prisma_1 = __importDefault(require("../../prisma"));
class CreateCandidateService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, email, password, phone, city, state }) {
            try {
                // Validação de campos
                if (!name) {
                    throw new Error("Nome incorreto");
                }
                if (!email) {
                    throw new Error("Email não informado");
                }
                if (!password) {
                    throw new Error("Senha não informada");
                }
                if (!phone) {
                    throw new Error("Número não informado");
                }
                if (!city) {
                    throw new Error("Cidade não informada");
                }
                if (!state) {
                    throw new Error("Estado não informado");
                }
                // Expressão regular que verifica se é email
                const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (!email || !emailRegex.test(email)) {
                    throw new Error("Email inválido");
                }
                // Verifica se já existe o use com o email
                const candidateExists = yield prisma_1.default.candidate.findFirst({
                    where: {
                        email: email
                    }
                });
                if (candidateExists) {
                    throw new Error("Candidato já cadastrado");
                }
                // Cria a criptografia da senha
                const hashedPassword = yield (0, bcryptjs_1.hash)(password, 10);
                // Cria o user
                const user = yield prisma_1.default.candidate.create({
                    data: {
                        name,
                        email,
                        password_hash: hashedPassword,
                        phone,
                        city,
                        state,
                    },
                    select: {
                        name: true,
                        email: true,
                        id: true
                    }
                });
                return user;
            }
            catch (error) {
                console.error("Erro ao criar candidato:", error.message);
                throw new Error(error.message || "Erro interno ao criar o candidato");
            }
        });
    }
}
exports.CreateCandidateService = CreateCandidateService;
