import { Request, Response, Router } from 'express'

// Middlewares
import { isAuthenticated } from './middlewares/isAuthenticated'
import { isAdmin, isCompany, isCandidate, isCompanyOrAdmin } from './middlewares/checkUserType'
import { validate, schemas, validateParams } from './middlewares/validation'

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
router.post('/auth/signup', validate(schemas.createUser), new CreateUserController().handle) // Cria um novo usuario
router.post('/auth/login', validate(schemas.auth), new AuthUserController().handle) // Faz a autenticação de login do usuario
router.get('/auth/me', isAuthenticated, new DetailUserController().handle) // Pega os detalhes do usuario logado
router.put('/auth/me/update', isAuthenticated, validate(schemas.editUser), new EditUserController().handle) // Edita o usuario autenticado


// ADM // 
router.put('/admin/users/deactivate/:id', isAuthenticated, isAdmin, validateParams(schemas.admDesctiveUser), new DeleteUserController().handle) // Desativa o usuário por id
router.get('/admin/users/list', isAuthenticated, isAdmin, new ListAllCandidateController().handle) // Lista todos os candidatos
router.get('/admin/users/:id', isAuthenticated, isAdmin, validateParams(schemas.admDetailsUser), new DetailsByIdUserController().handle) // Detalhes de um usuário por id


// CANDIDATE PROFILE //
router.post('/profile/candidate/create/:id', isAuthenticated, validate(schemas.createCandidateProfile), new CreateProfileController().handle) // Cria um novo perfil do user
router.post('/profile/candidate/update/:id', isAuthenticated, () =>{}) // Editar um perfil por id
router.post('/profile/candidate/me', isAuthenticated, () =>{}) // Pega o perfil de um candidato por JWT


// GERAR E IMPORTAR PDF //
router.post('/profile/candidate/pdf/me', isAuthenticated, () => {}) // Gera CV em PDF
router.post('/profile/import/pdf', isAuthenticated, () => {}) // Importa CV em PDF
router.post('/profile/import/linkedin', isAuthenticated, () => {}) // Importa LinkedIn

// VAGAS //
router.post('/jobs/create', isAuthenticated, isCompanyOrAdmin, validate(schemas.createJob), new CreateJobController().handle) // Cria uma nova vaga
router.get('/jobs/list', isAuthenticated, new ListJobController().handle) // Lista todas as vagas
router.get('/jobs/list/:id', isAuthenticated, new DetailUserController().handle) // Detalhes de uma vaga por id
router.delete('/jobs/delete/:id', isAuthenticated, isCompanyOrAdmin, () =>{}) // Deleta uma vaga
router.put('/jobs/update/:id', isAuthenticated, isCompanyOrAdmin, validate(schemas.createJob), () =>{}) // Editar uma vaga


// CADIDATURAS //
router.post('/applications/create/:id', isAuthenticated, isCandidate, validate(schemas.createJobApplications), new CreateJobApplicationController().handle) // Cria uma nova candidatura
router.get('/applications/list/:id', isAuthenticated, validateParams(schemas.detailsJobApplications), new ListBycandidateJobController().handle) // Lista candidaturas do usuário
router.post('/applications/delete/:id', isAuthenticated, isCandidate, () =>{}) // Deleta uma candidatura



export { router }