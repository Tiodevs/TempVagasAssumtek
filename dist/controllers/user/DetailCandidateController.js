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
exports.DetailCandidateController = void 0;
const DetailCandidateService_1 = require("../../services/user/DetailCandidateService");
class DetailCandidateController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Pega o user pelo middleware de auth
            const user_id = req.user_id;
            const detailCandidateService = new DetailCandidateService_1.DetailCandidateService();
            const candidate = yield detailCandidateService.execute(user_id);
            return res.json(candidate);
        });
    }
}
exports.DetailCandidateController = DetailCandidateController;
