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
exports.CreateUserService = void 0;
const bcryptjs_1 = require("bcryptjs");
const prisma_1 = __importDefault(require("../../prisma"));
class CreateUserService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, email, password, phone, type, createdBy }) {
            try {
                // Verifica se já existe o usuário com o email
                const userExists = yield prisma_1.default.user.findFirst({
                    where: {
                        email: email
                    }
                });
                if (userExists) {
                    throw new Error("Usuário já cadastrado");
                }
                // Cria a criptografia da senha
                const hashedPassword = yield (0, bcryptjs_1.hash)(password, 10);
                // Cria o usuário
                const user = yield prisma_1.default.user.create({
                    data: {
                        name,
                        email,
                        password_hash: hashedPassword,
                        phone,
                        type, // 'candidate', 'company', 'admin'
                        is_active: true,
                        createdBy
                    },
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                        type: true,
                        profile_picture: true,
                        is_active: true,
                        created_at: true,
                        updated_at: true,
                        createdBy: true,
                        updatedBy: true
                    }
                });
                return user;
            }
            catch (error) {
                console.error("Erro ao criar usuário:", error.message);
                throw new Error(error.message || "Erro interno ao criar o usuário");
            }
        });
    }
}
exports.CreateUserService = CreateUserService;
