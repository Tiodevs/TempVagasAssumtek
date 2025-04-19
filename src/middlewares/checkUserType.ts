import { Response, Request, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

interface Payload {
    name: string
    email: string
    type: string
    sub: string
}

// Middleware flexível que verifica se o usuário é de um dos tipos especificados
export function checkUserType(allowedTypes: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        // Verifica se recebeu o token no header de autenticação
        const authToken = req.headers.authorization;
        if (!authToken) {
            return res.status(401).json({ error: 'Token não fornecido' });
        }

        // Pega só o token JWT
        const [, token] = authToken.split(" ");

        try {
            // Verifica se o token é válido e extrai as informações
            const decoded = verify(
                token, 
                process.env.JWT_SECRET as string
            ) as Payload;

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

        } catch (error) {
            return res.status(403).json({ error: 'Token inválido ou expirado' });
        }
    };
}

// Middlewares específicos para cada tipo usando o middleware genérico
export const isAdmin = checkUserType(['admin']);
export const isCompany = checkUserType(['company']);
export const isCandidate = checkUserType(['candidate']);
export const isCompanyOrAdmin = checkUserType(['company', 'admin']); 