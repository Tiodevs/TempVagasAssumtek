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
exports.DetailUserService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class DetailUserService {
    execute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Se não tiver ID, retorna erro
                if (!id) {
                    throw new Error("ID não informado");
                }
                const user = yield prisma_1.default.user.findFirst({
                    where: {
                        id: id
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
                if (!user) {
                    throw new Error("Usuário não encontrado");
                }
                return user;
            }
            catch (error) {
                console.error("Erro ao buscar detalhes do usuário:", error.message);
                throw new Error(error.message || "Erro interno ao buscar os detalhes do usuário");
            }
        });
    }
}
exports.DetailUserService = DetailUserService;
