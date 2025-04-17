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
exports.EditCandidateController = void 0;
const EditCandidateService_1 = require("../../services/user/EditCandidateService");
class EditCandidateController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { candidateid, name, email, phone, city, state } = req.body;
            const editCandidateService = new EditCandidateService_1.EditCandidateService();
            console.log("Iniciar a edição");
            const editCandidate = yield editCandidateService.execute({
                name, email, phone, city, state, candidateid
            });
            res.json(editCandidate);
        });
    }
}
exports.EditCandidateController = EditCandidateController;
