"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCompanyOrAdmin = exports.isCandidate = exports.isCompany = exports.isAdmin = void 0;
exports.checkUserType = checkUserType;
const jsonwebtoken_1 = require("jsonwebtoken");
// Middleware flexível que verifica se o usuário é de um dos tipos especificados
function checkUserType(allowedTypes) {
    return (req, res, next) => {
        // Verifica se recebeu o token no header de autenticação
        const authToken = req.headers.authorization;
        if (!authToken) {
            return res.status(401).json({ error: 'Token não fornecido' });
        }
        // Pega só o token JWT
        const [, token] = authToken.split(" ");
        try {
            // Verifica se o token é válido e extrai as informações
            const decoded = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
            // Verifica se o tipo do usuário está na lista de tipos permitidos
            if (!allowedTypes.includes(decoded.type)) {
                return res.status(403).json({
                    error: `Acesso negado. Apenas usuários do tipo ${allowedTypes.join(' ou ')} podem acessar este recurso.`
                });
            }
            // Adiciona o tipo do usuário e outros dados ao request para uso posterior
            req.user_id = decoded.sub;
            req.user_type = decoded.type;
            req.user_email = decoded.email;
            req.user_name = decoded.name;
            // Continua o andamento da aplicação
            return next();
        }
        catch (error) {
            return res.status(403).json({ error: 'Token inválido ou expirado' });
        }
    };
}
// Middlewares específicos para cada tipo usando o middleware genérico
exports.isAdmin = checkUserType(['admin']);
exports.isCompany = checkUserType(['company']);
exports.isCandidate = checkUserType(['candidate']);
exports.isCompanyOrAdmin = checkUserType(['company', 'admin']);
