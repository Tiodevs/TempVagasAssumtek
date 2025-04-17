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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProfileController = void 0;
const CreateProfileService_1 = require("../../services/profile/CreateProfileService");
class CreateProfileController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Iniciando criação de profile");
                // Pega as informações do body
                const { candidate_id, summary, skills, experience, education, languages, linkedin, github, imported_from } = req.body;
                // Cria uma instancia do service
                const createProfileService = new CreateProfileService_1.CreateProfileService();
                //  Chama o metodo execute do service que foi instanciado e passa os dados do body
                const profile = yield createProfileService.execute({ candidate_id, summary, skills, experience, education, languages, linkedin, github, imported_from });
                console.log("Profile criado com sucesso:", profile);
                return res.json(profile);
            }
            catch (error) {
                console.error("Erro ao criar profile:", error.message, error.stack);
                return res.status(500).json({
                    status: "error",
                    message: error.message || "Erro interno no servidor."
                });
            }
        });
    }
}
exports.CreateProfileController = CreateProfileController;
