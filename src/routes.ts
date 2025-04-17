import { Request, Response, Router } from 'express'

// Middlewares
import { isAuthenticated } from './middlewares/isAuthenticated'

// Controllers
// Auth
import { AuthCandidateController, CreateCandidateController, DeleteCandidateController, DetailCandidateController, EditCandidateController } from './controllers/userController'

// ProfileUser
import { CreateProfileController } from './controllers/profileContoller'

// Aplicações de vagas
import { CreateJobApplicationController, ListBycandidateJobController } from './controllers/jobapplicationController'

// Vagas
import { CreateJobController, ListJobController } from './controllers/jobController'

// ADM e dashboard
import { DetalisByIdCandidateController, ListAllCandidadeController } from './controllers/admController'

const router = Router()

router.get('/', (req: Request, res: Response) => {
  return res.send(`
    <h1 style='font-family: sans-serif'>
        API do Sistema de vagas ASSUMTEK!!!
    <h1>
  `)
})

// AUTH CANDIDATE //
router.post('/auth/signup', new CreateCandidateController().handle) // Cria um novo usuario
router.post('/auth/login', new AuthCandidateController().handle) // Faz a autenticação de login do usuario
router.get('/auth/me', isAuthenticated, new DetailCandidateController().handle) // Pega os detalhes do usuario logado
router.put('/auth/me/update', isAuthenticated, new EditCandidateController().handle) // Edita o usuario autenticado


// ADM // 
router.put('/admin/candidates/deactivate/:id', isAuthenticated, new DeleteCandidateController().handle) // Desativa o usuário por id
router.get('/admin/candidates/list', isAuthenticated, new ListAllCandidadeController().handle) // Lista todos os candidatos
router.get('/admin/candidates/:id', isAuthenticated, new DetalisByIdCandidateController().handle) // Detalhes de um candidato por id


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
router.get('/jobs/list/:id', isAuthenticated, new DetailCandidateController().handle) // Detalhes de uma vaga por id
router.delete('/jobs/delete/:id', isAuthenticated, () =>{}) // Deleta uma vaga
router.put('/jobs/update/:id', isAuthenticated, () =>{}) // Editar uma vaga


// CADIDATURAS //
router.post('/applications/create/:id', isAuthenticated, new CreateJobApplicationController().handle) // Cria uma nova candidatura
router.get('/applications/list/:id', isAuthenticated, new ListBycandidateJobController().handle) // Lista candidaturas do usuário
router.post('/applications/delete/:id', isAuthenticated, () =>{}) // Deleta uma candidatura



export { router }