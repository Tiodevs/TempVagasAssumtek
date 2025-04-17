// IMPORTS
import express from 'express'
import cors from 'cors'
import { router } from './routes'

// Inicia o express
const app = express()

// Api vai usar JSON
app.use(express.json())

// Deixar acessivel para o front
app.use(cors())

// Usar nossas rotas
app.use(router)


app.listen(process.env.PORT, () => {
    console.log(`Servidor ligado na porta ${process.env.PORT}`)
})