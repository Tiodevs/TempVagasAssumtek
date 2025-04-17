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
        return __awaiter(this, arguments, void 0, function* ({ candidate_id, summary, skills, experience, education, languages, linkedin, github, imported_from }) {
            try {
                // Validação de campos
                if (!candidate_id) {
                    throw new Error("candidate_id não informado");
                }
                if (!summary) {
                    throw new Error("summary não informado");
                }
                if (!skills) {
                    throw new Error("skills não informada");
                }
                if (!experience) {
                    throw new Error("experience não informado");
                }
                if (!education) {
                    throw new Error("education não informada");
                }
                if (!languages) {
                    throw new Error("languages não informado");
                }
                if (!linkedin) {
                    throw new Error("linkedin não informado");
                }
                if (!github) {
                    throw new Error("github não informado");
                }
                if (!imported_from) {
                    throw new Error("imported_from não informado");
                }
                // Verifica se já existe o use com o email
                const profileExists = yield prisma_1.default.candidateProfile.findFirst({
                    where: {
                        candidate_id: candidate_id
                    }
                });
                if (profileExists) {
                    throw new Error("Profile já criado");
                }
                // Cria o user
                const profile = yield prisma_1.default.candidateProfile.create({
                    data: {
                        candidate_id,
                        summary,
                        skills,
                        experience,
                        education,
                        languages,
                        linkedin,
                        github,
                        imported_from
                    }
                });
                return profile;
            }
            catch (error) {
                console.error("Erro ao criar candidato:", error.message);
                throw new Error(error.message || "Erro interno ao criar o candidato");
            }
        });
    }
}
exports.CreateProfileService = CreateProfileService;
