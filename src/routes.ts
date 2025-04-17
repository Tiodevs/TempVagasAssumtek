import { Request, Response, Router } from 'express'

// Middlewares
import { isAuthenticated } from './middlewares/isAuthenticated'

// Controllers
// Auth
import { AuthUserController, CreateUserController, DeleteUserController, DetailUserController, EditUserController } from './controllers/userController'

// ProfileUser
import { CreateProfileController } from './controllers/profileContoller'

// Aplicações de vagas
import { CreateJobApplicationController, ListBycandidateJobController } from './controllers/jobapplicationController'

// Vagas
import { CreateJobController, ListJobController } from './controllers/jobController'

// ADM e dashboard
import { DetailsByIdUserController, ListAllCandidateController } from './controllers/admController'

const router = Router()

router.get('/', (req: Request, res: Response) => {
  return res.send(`
    <h1 style='font-family: sans-serif'>
        API do Sistema de vagas ASSUMTEK!!!
    <h1>
  `)
})

// AUTH USER //
router.post('/auth/signup', new CreateUserController().handle) // Cria um novo usuario
router.post('/auth/login', new AuthUserController().handle) // Faz a autenticação de login do usuario
router.get('/auth/me', isAuthenticated, new DetailUserController().handle) // Pega os detalhes do usuario logado
router.put('/auth/me/update', isAuthenticated, new EditUserController().handle) // Edita o usuario autenticado


// ADM // 
router.put('/admin/users/deactivate/:id', isAuthenticated, new DeleteUserController().handle) // Desativa o usuário por id
router.get('/admin/users/list', isAuthenticated, new ListAllCandidateController().handle) // Lista todos os candidatos
router.get('/admin/users/:id', isAuthenticated, new DetailsByIdUserController().handle) // Detalhes de um usuário por id


// CANDIDATE PROFILE //
router.post('/profile/candidate/create/:id', isAuthenticated, new CreateProfileController().handle) // Cria um novo perfil do user
router.post('/profile/candidate/update/:id', isAuthenticated, () =>{}) // Editar um perfil por id
router.post('/profiles/candidate/list', isAuthenticated, () =>{}) // Lista todos os perfis
router.post('/profile/candidate/:id', isAuthenticated, () =>{}) // Pega o perfil de um candidato por id


// GERAR E IMPORTAR PDF //
router.post('/profile/:id/pdf', isAuthenticated, () => {}) // Gera CV em PDF
router.post('/profile/import/pdf', isAuthenticated, () => {}) // Importa CV em PDF
router.post('/profile/import/linkedin', isAuthenticated, () => {}) // Importa LinkedIn

// VAGAS //
router.post('/jobs/create', isAuthenticated, new CreateJobController().handle) // Cria uma nova vaga
router.get('/jobs/list', isAuthenticated, new ListJobController().handle) // Lista todas as vagas
router.get('/jobs/list/:id', isAuthenticated, new DetailUserController().handle) // Detalhes de uma vaga por id
router.delete('/jobs/delete/:id', isAuthenticated, () =>{}) // Deleta uma vaga
router.put('/jobs/update/:id', isAuthenticated, () =>{}) // Editar uma vaga


// CADIDATURAS //
router.post('/applications/create/:id', isAuthenticated, new CreateJobApplicationController().handle) // Cria uma nova candidatura
router.get('/applications/list/:id', isAuthenticated, new ListBycandidateJobController().handle) // Lista candidaturas do usuário
router.post('/applications/delete/:id', isAuthenticated, () =>{}) // Deleta uma candidatura



export { router }