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
exports.DetailsByIdUserService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class DetailsByIdUserService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id }) {
            try {
                // Validação de campos
                if (!id) {
                    throw new Error("ID do usuário não informado");
                }
                // Buscar usuário pelo ID
                const userDetails = yield prisma_1.default.user.findUnique({
                    where: {
                        id: id
                    },
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                        type: true,
                        is_active: true,
                        created_at: true,
                        updated_at: true,
                        profile_picture: true,
                        updatedBy: true,
                        candidateProfile: {
                            include: {
                                skills: true
                            }
                        },
                        company: true
                    }
                });
                if (!userDetails) {
                    throw new Error("Usuário não encontrado");
                }
                return userDetails;
            }
            catch (error) {
                console.error("Erro ao buscar detalhes do usuário:", error.message);
                throw new Error(error.message || "Erro interno ao buscar detalhes do usuário");
            }
        });
    }
}
exports.DetailsByIdUserService = DetailsByIdUserService;
