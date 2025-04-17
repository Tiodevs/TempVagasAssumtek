import { Response, Request, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

interface Payload {
    name: string
    email: string
    sub: string
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {

    // Verifica se receber o token no header de autenticação
    const authToken = req.headers.authorization;
    if (!authToken) {
        return res.status(401).end()
    }

    // Pega so o token JWT
    const [, token] = authToken.split(" ")

    
    console.log("Token JWT recebido pelo middleware", token)

    // verifica se o token é válido
    try {
        const { sub } = verify(
            token, 
            process.env.JWT_SECRET
        ) as Payload

        // Coloca o id do usuário dentro do request
        // INPORTANTE, criei o type dele sobscrevendo o do express
        req.user_id = sub

        // Continua o andamento da aplicação
        return next()

    } catch (error) {
        return res.status(403).json({ error: 'Invalid JWT Token' });
    }

}