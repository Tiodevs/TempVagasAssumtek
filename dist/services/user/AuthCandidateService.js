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
exports.AuthCandidateService = void 0;
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const prisma_1 = __importDefault(require("../../prisma"));
class AuthCandidateService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, password }) {
            try {
                // Valida os campos
                if (!email) {
                    console.log("Senha não foi enviada");
                    throw new Error("Senha não foi enviada");
                }
                if (!password) {
                    console.log("Senha não foi enviada");
                    throw new Error("Senha não foi enviada");
                }
                // Verifica se tem um candidato com o email cadastrado
                const user = yield prisma_1.default.candidate.findFirst({
                    where: {
                        email: email
                    }
                });
                // Se não tiver da erro
                if (!user) {
                    console.log("Nelhum user encontrado com esse email");
                    throw new Error("Email ou senha incorretos");
                }
                // Ele faz a verificação se a senha criptografada é a mesma enviada pelo user
                const passwordMatch = yield (0, bcryptjs_1.compare)(password, user.password_hash);
                if (!passwordMatch) {
                    console.log("Senha invalida");
                    throw new Error("Email ou senha incorretos");
                }
                // Gera um token JWT, armazena o nome e email do candidato
                const token = (0, jsonwebtoken_1.sign)({
                    name: user.name,
                    email: user.email
                }, process.env.JWT_SECRET, {
                    subject: user.id,
                    expiresIn: '1d'
                });
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    token
                };
            }
            catch (error) {
                console.error("Erro ao logar o candidato:", error.message);
                throw new Error(error.message || "Erro interno ao logar o candidato");
            }
        });
    }
}
exports.AuthCandidateService = AuthCandidateService;
