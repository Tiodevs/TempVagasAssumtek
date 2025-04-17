"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// IMPORTS
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
// Inicia o express
const app = (0, express_1.default)();
// Api vai usar JSON
app.use(express_1.default.json());
// Deixar acessivel para o front
app.use((0, cors_1.default)());
// Usar nossas rotas
app.use(routes_1.router);
app.listen(process.env.PORT, () => {
    console.log(`Servidor ligado na porta ${process.env.PORT}`);
});
