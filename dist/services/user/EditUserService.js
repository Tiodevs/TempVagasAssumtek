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
exports.EditUserService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class EditUserService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ userId, name, email, phone }) {
            try {
                // Verifica se o usuário existe
                const user = yield prisma_1.default.user.findUnique({
                    where: { id: userId },
                });
                if (!user) {
                    throw new Error("Usuário não encontrado");
                }
                // Atualiza o usuário
                const updatedUser = yield prisma_1.default.user.update({
                    where: { id: userId },
                    data: {
                        name,
                        email,
                        phone,
                        updated_at: new Date(),
                        updatedBy: userId
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
                return updatedUser;
            }
            catch (error) {
                console.error("Erro ao atualizar usuário:", error.message);
                throw new Error(error.message || "Erro interno ao atualizar o usuário");
            }
        });
    }
}
exports.EditUserService = EditUserService;
