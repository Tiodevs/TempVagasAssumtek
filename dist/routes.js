"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
// Middlewares
const isAuthenticated_1 = require("./middlewares/isAuthenticated");
const checkUserType_1 = require("./middlewares/checkUserType");
const validation_1 = require("./middlewares/validation");
// Controllers
// Auth
const userController_1 = require("./controllers/userController");
// ProfileUser
const profileContoller_1 = require("./controllers/profileContoller");
// Aplicações de vagas
const jobapplicationController_1 = require("./controllers/jobapplicationController");
// Vagas
const jobController_1 = require("./controllers/jobController");
// ADM e dashboard
const admController_1 = require("./controllers/admController");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/', (req, res) => {
    return res.send(`
    <h1 style='font-family: sans-serif'>
        API do Sistema de vagas ASSUMTEK!!!
    <h1>
  `);
});
// AUTH USER //
router.post('/auth/signup', (0, validation_1.validate)(validation_1.schemas.createUser), new userController_1.CreateUserController().handle); // Cria um novo usuario
router.post('/auth/login', (0, validation_1.validate)(validation_1.schemas.auth), new userController_1.AuthUserController().handle); // Faz a autenticação de login do usuario
router.get('/auth/me', isAuthenticated_1.isAuthenticated, new userController_1.DetailUserController().handle); // Pega os detalhes do usuario logado
router.put('/auth/me/update', isAuthenticated_1.isAuthenticated, (0, validation_1.validate)(validation_1.schemas.editUser), new userController_1.EditUserController().handle); // Edita o usuario autenticado
// ADM // 
router.put('/admin/users/deactivate/:id', isAuthenticated_1.isAuthenticated, checkUserType_1.isAdmin, (0, validation_1.validateParams)(validation_1.schemas.admDesctiveUser), new userController_1.DeleteUserController().handle); // Desativa o usuário por id
router.get('/admin/users/list', isAuthenticated_1.isAuthenticated, checkUserType_1.isAdmin, new admController_1.ListAllCandidateController().handle); // Lista todos os candidatos
router.get('/admin/users/:id', isAuthenticated_1.isAuthenticated, checkUserType_1.isAdmin, (0, validation_1.validateParams)(validation_1.schemas.admDetailsUser), new admController_1.DetailsByIdUserController().handle); // Detalhes de um usuário por id
// CANDIDATE PROFILE //
router.post('/profile/candidate/create/:id', isAuthenticated_1.isAuthenticated, (0, validation_1.validate)(validation_1.schemas.createCandidateProfile), new profileContoller_1.CreateProfileController().handle); // Cria um novo perfil do user
router.post('/profile/candidate/update/:id', isAuthenticated_1.isAuthenticated, () => { }); // Editar um perfil por id
router.post('/profile/candidate/me', isAuthenticated_1.isAuthenticated, () => { }); // Pega o perfil de um candidato por JWT
// GERAR E IMPORTAR PDF //
router.post('/profile/candidate/pdf/me', isAuthenticated_1.isAuthenticated, () => { }); // Gera CV em PDF
router.post('/profile/import/pdf', isAuthenticated_1.isAuthenticated, () => { }); // Importa CV em PDF
router.post('/profile/import/linkedin', isAuthenticated_1.isAuthenticated, () => { }); // Importa LinkedIn
// VAGAS //
router.post('/jobs/create', isAuthenticated_1.isAuthenticated, checkUserType_1.isCompanyOrAdmin, (0, validation_1.validate)(validation_1.schemas.createJob), new jobController_1.CreateJobController().handle); // Cria uma nova vaga
router.get('/jobs/list', isAuthenticated_1.isAuthenticated, new jobController_1.ListJobController().handle); // Lista todas as vagas
router.get('/jobs/list/:id', isAuthenticated_1.isAuthenticated, new userController_1.DetailUserController().handle); // Detalhes de uma vaga por id
router.delete('/jobs/delete/:id', isAuthenticated_1.isAuthenticated, checkUserType_1.isCompanyOrAdmin, () => { }); // Deleta uma vaga
router.put('/jobs/update/:id', isAuthenticated_1.isAuthenticated, checkUserType_1.isCompanyOrAdmin, (0, validation_1.validate)(validation_1.schemas.createJob), () => { }); // Editar uma vaga
// CADIDATURAS //
router.post('/applications/create/:id', isAuthenticated_1.isAuthenticated, checkUserType_1.isCandidate, (0, validation_1.validate)(validation_1.schemas.createJobApplications), new jobapplicationController_1.CreateJobApplicationController().handle); // Cria uma nova candidatura
router.get('/applications/list/:id', isAuthenticated_1.isAuthenticated, (0, validation_1.validateParams)(validation_1.schemas.detailsJobApplications), new jobapplicationController_1.ListBycandidateJobController().handle); // Lista candidaturas do usuário
router.post('/applications/delete/:id', isAuthenticated_1.isAuthenticated, checkUserType_1.isCandidate, () => { }); // Deleta uma candidatura
