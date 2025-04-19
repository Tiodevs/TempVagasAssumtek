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
exports.DeleteUserService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class DeleteUserService {
    execute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!id) {
                    throw new Error("ID não informado");
                }
                // Verifica se o usuário existe
                const user = yield prisma_1.default.user.findUnique({
                    where: { id }
                });
                if (!user) {
                    throw new Error("Usuário não encontrado");
                }
                // Desativa o usuário em vez de excluir
                const deactivatedUser = yield prisma_1.default.user.update({
                    where: { id },
                    data: {
                        is_active: false,
                        updated_at: new Date()
                    }
                });
                return { message: "Usuário desativado com sucesso" };
            }
            catch (error) {
                console.error("Erro ao desativar usuário:", error.message);
                throw new Error(error.message || "Erro interno ao desativar o usuário");
            }
        });
    }
}
exports.DeleteUserService = DeleteUserService;
