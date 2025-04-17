"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
// Middlewares
const isAuthenticated_1 = require("./middlewares/isAuthenticated");
// Controllers
// User
const CreateCandidateController_1 = require("./controllers/user/CreateCandidateController");
const AuthCandidateController_1 = require("./controllers/user/AuthCandidateController");
const DetailCandidateController_1 = require("./controllers/user/DetailCandidateController");
const EditCandidateController_1 = require("./controllers/user/EditCandidateController");
const DeleteCandidateController_1 = require("./controllers/user/DeleteCandidateController");
// Profile
const CreateProfileController_1 = require("./controllers/profile/CreateProfileController");
// Vagas
const CreateJobController_1 = require("./controllers/job/CreateJobController");
const ListJobController_1 = require("./controllers/job/ListJobController");
// Candidaturas
const CreateJobApplicationController_1 = require("./controllers/jobapplication/CreateJobApplicationController");
const ListBycandidateJobController_1 = require("./controllers/jobapplication/ListBycandidateJobController");
// Adiministração
const ListAllCandidadeController_1 = require("./controllers/adm/ListAllCandidadeController");
const DetalisCandidateController_1 = require("./controllers/adm/DetalisCandidateController");
const router = (0, express_1.Router)();
exports.router = router;
// Para exibição do front :D
router.get('/', (req, res) => {
    return res.send(`
    <h1 style='font-family: sans-serif'>
        API do Sistema de vagas ASSUMTEK!!!
    <h1>
  `);
});
// AUTH CANDIDATE //
// Cria um novo usuario
router.post('/auth/register', new CreateCandidateController_1.CreateCandidateController().handle);
// Faz a altenticação de login do usuario
router.post('/auth/login', new AuthCandidateController_1.AuthCandidateController().handle);
// Pega os detalhes do usuario logado pelo JWT
router.get('/auth/me', isAuthenticated_1.isAuthenticated, new DetailCandidateController_1.DetailCandidateController().handle);
// Edita o usuario por id dele
router.put('/auth/editbyid', isAuthenticated_1.isAuthenticated, new EditCandidateController_1.EditCandidateController().handle);
// ADIMINISTRADOR //
// Deixa o usuario desativado pegando por id do candidato
router.put('/candidates/deletebyid', isAuthenticated_1.isAuthenticated, new DeleteCandidateController_1.DeleteCandidateController().handle);
// Pega todos os candidatos
router.get('/candidates/allcandidate', isAuthenticated_1.isAuthenticated, new ListAllCandidadeController_1.ListAllCandidadeController().handle);
// Pega detalhes do candidato por id
router.get('/candidates/detailsbyid', isAuthenticated_1.isAuthenticated, new DetalisCandidateController_1.DetalisByIdCandidateController().handle);
// CANDIDATE PROFILE //
// Cria um novo profile do user
router.post('/candidatesprofile/register', isAuthenticated_1.isAuthenticated, new CreateProfileController_1.CreateProfileController().handle);
// Editar um profile por id
router.post('/candidatesprofile/editbyid', isAuthenticated_1.isAuthenticated, () => { });
// Lista todos os perfis dos candidatos
router.post('/candidatesprofile/listall', isAuthenticated_1.isAuthenticated, () => { });
// Lista o perfil do candidato por id
router.post('/candidatesprofile/listbyid', isAuthenticated_1.isAuthenticated, () => { });
// Gera um CV como PDF coms as informações do perfil
router.post('/candidatesprofile/pdf ', isAuthenticated_1.isAuthenticated, () => { });
// Pega as informações do PDF do CV antigo e coloca no perfil
router.post('/candidatesprofile/import/pdf ', isAuthenticated_1.isAuthenticated, () => { });
// Pega as informações do LinkedIn do user
router.post('/candidatesprofile/import/linkedin  ', isAuthenticated_1.isAuthenticated, () => { });
// VAGAS //
// Cria uma nova vaga 
router.post('/job/register', isAuthenticated_1.isAuthenticated, new CreateJobController_1.CreateJobController().handle);
// Lista todas as vagas
router.get('/job/listall', isAuthenticated_1.isAuthenticated, new ListJobController_1.ListJobController().handle);
// Pegar detalhes de uma vaga por id
router.get('/job/detailsbyid', isAuthenticated_1.isAuthenticated, new DetailCandidateController_1.DetailCandidateController().handle);
// Deleta uma vaga por id
router.delete('/job/deletbyid', isAuthenticated_1.isAuthenticated, () => { });
// Editar um vaga por id
router.put('/job/editbyid', isAuthenticated_1.isAuthenticated, () => { });
// CADIDATURAS //
// Cria uma nova cadidatura 
router.post('/jobapplication/register', isAuthenticated_1.isAuthenticated, new CreateJobApplicationController_1.CreateJobApplicationController().handle);
// Lista candidaturas do user
router.get('/jobapplication/list', isAuthenticated_1.isAuthenticated, new ListBycandidateJobController_1.ListBycandidateJobController().handle);
// Deleta uma cadidatura por id
router.post('/jobapplication/deletbyid', isAuthenticated_1.isAuthenticated, () => { });
