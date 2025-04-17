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
exports.AuthCandidateController = void 0;
const AuthCandidateService_1 = require("../../services/user/AuthCandidateService");
class AuthCandidateController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Rota de login foi chamada");
            const { email, password } = req.body;
            const authCandidateService = new AuthCandidateService_1.AuthCandidateService();
            const user = yield authCandidateService.execute({
                email,
                password
            });
            return res.json(user);
        });
    }
}
exports.AuthCandidateController = AuthCandidateController;
