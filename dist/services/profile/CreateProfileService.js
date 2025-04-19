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
exports.CreateProfileService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class CreateProfileService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, summary, skills, experience, education, languages, linkedin, github, imported_from }) {
            try {
                // Validação de campos
                if (!id) {
                    throw new Error("id não informado");
                }
                // Validações essenciais, tornando os outros campos opcionais
                if (!languages) {
                    throw new Error("languages não informado");
                }
                // Verifica se o usuário existe
                const userExists = yield prisma_1.default.user.findUnique({
                    where: {
                        id: id
                    }
                });
                if (!userExists) {
                    throw new Error("Usuário não encontrado");
                }
                // Verifica se já existe perfil para este usuário
                const profileExists = yield prisma_1.default.candidateProfile.findFirst({
                    where: {
                        userId: id
                    }
                });
                if (profileExists) {
                    throw new Error("Perfil já criado para este usuário");
                }
                // Cria o perfil do candidato com transação para garantir a criação de habilidades
                const result = yield prisma_1.default.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                    // Cria o perfil
                    const profile = yield tx.candidateProfile.create({
                        data: {
                            userId: id,
                            summary,
                            experience,
                            education,
                            languages,
                            linkedin,
                            github,
                            imported_from,
                        }
                    });
                    // Se houver habilidades, cria cada uma delas
                    if (skills && skills.length > 0) {
                        for (const skill of skills) {
                            yield tx.skill.create({
                                data: {
                                    name: skill.name,
                                    candidateProfileId: profile.id
                                }
                            });
                        }
                    }
                    // Retorna o perfil com as habilidades criadas
                    return yield tx.candidateProfile.findUnique({
                        where: { id: profile.id },
                        include: { skills: true }
                    });
                }));
                return result;
            }
            catch (error) {
                console.error("Erro ao criar perfil de candidato:", error.message);
                throw new Error(error.message || "Erro interno ao criar o perfil de candidato");
            }
        });
    }
}
exports.CreateProfileService = CreateProfileService;
