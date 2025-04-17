"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = isAuthenticated;
const jsonwebtoken_1 = require("jsonwebtoken");
function isAuthenticated(req, res, next) {
    // Verifica se receber o token no header de autenticação
    const authToken = req.headers.authorization;
    if (!authToken) {
        return res.status(401).end();
    }
    // Pega so o token JWT
    const [, token] = authToken.split(" ");
    console.log("Token JWT recebido pelo middleware", token);
    // verifica se o token é válido
    try {
        const { sub } = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        // Coloca o id do usuário dentro do request
        // INPORTANTE, criei o type dele sobscrevendo o do express
        req.user_id = sub;
        // Continua o andamento da aplicação
        return next();
    }
    catch (error) {
        return res.status(403).json({ error: 'Invalid JWT Token' });
    }
}
