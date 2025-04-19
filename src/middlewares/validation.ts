import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

// Middleware para validação genérica usando Yup
export function validate(schema: yup.ObjectSchema<any>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Valida o request body com o schema fornecido
      await schema.validate(req.body, { abortEarly: false });
      
      // Se passar na validação, continua para o próximo middleware/controller
      next();
    } catch (error: any) {
      // Se for erro de validação do Yup
      if (error instanceof yup.ValidationError) {
        const validationErrors = error.inner.map(err => ({
          field: err.path,
          message: err.message
        }));
        
        return res.status(400).json({
          status: "validation_error",
          message: "Erro de validação dos dados",
          errors: validationErrors
        });
      }
      
      // Se for outro tipo de erro
      return res.status(500).json({
        status: "error",
        message: "Erro interno no servidor."
      });
    }
  };
}

// Para validar parâmetros na URL
export function validateParams(schema: yup.ObjectSchema<any>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.params, { abortEarly: false });
      next();
    } catch (error: any) {
      if (error instanceof yup.ValidationError) {
        const validationErrors = error.inner.map(err => ({
          field: err.path,
          message: err.message
        }));
        
        return res.status(400).json({
          status: "validation_error",
          message: "Erro de validação dos parâmetros",
          errors: validationErrors
        });
      }
      
      return res.status(500).json({
        status: "error",
        message: "Erro interno no servidor."
      });
    }
  };
}

// Schemas para validação das diferentes rotas
export const schemas = {

  // Auth
  // Schema para criação de usuário
  createUser: yup.object().shape({
    name: yup.string().required('Nome é obrigatório'),
    email: yup.string().email('Email inválido').required('Email é obrigatório'),
    password: yup.string().min(6, 'Senha deve ter no mínimo 6 caracteres').required('Senha é obrigatória'),
    phone: yup.string().required('Número de telefone é obrigatório'),
    type: yup.string().oneOf(['candidate', 'company', 'admin'], 'Tipo de usuário inválido')
  }),
  
  // Schema para autenticação
  auth: yup.object().shape({
    email: yup.string().email('Email inválido').required('Email é obrigatório'),
    password: yup.string().required('Senha é obrigatória')
  }),
  
  // Schema para edição de usuário
  editUser: yup.object().shape({
    name: yup.string(),
    email: yup.string().email('Email inválido'),
    phone: yup.string()
  }),

  // Schema para alteração de senha
  changePassword: yup.object().shape({
    currentPassword: yup.string().required('Senha atual é obrigatória'),
    newPassword: yup.string()
      .min(6, 'Nova senha deve ter no mínimo 6 caracteres')
      .required('Nova senha é obrigatória')
      .notOneOf([yup.ref('currentPassword')], 'Nova senha deve ser diferente da atual'),
    confirmPassword: yup.string()
      .required('Confirmação de senha é obrigatória')
      .oneOf([yup.ref('newPassword')], 'Confirmação de senha não confere')
  }),

  // Schema para criação de perfil de candidato
  createCandidateProfile: yup.object().shape({
    summary: yup.string().max(1000, 'Resumo deve ter no máximo 1000 caracteres'),
    linkedin: yup.string().url('URL do LinkedIn inválida'),
    github: yup.string().url('URL do GitHub inválida'),
    languages: yup.array().of(
      yup.object().shape({
        language: yup.string().required('Nome do idioma é obrigatório'),
        level: yup.string().oneOf(['básico', 'intermediário', 'avançado', 'fluente'], 'Nível inválido')
      })
    )
  }),

  // Schema para criação de vaga
  createJob: yup.object().shape({
    title: yup.string().required('Título é obrigatório'),
    description: yup.string().required('Descrição é obrigatória'),
    requirements: yup.string().required('Requisitos são obrigatórios'),
    location: yup.string().required('Localização é obrigatória'),
    department: yup.string().required('Departamento é obrigatório')
  }),

  // Shema para listagem de detalhes da vaga
  detailsJob: yup.object().shape({
    id: yup.string().required('ID do usuário é obrigatório')
  }),

  // Schema para candidatura a vaga
  createJobApplications: yup.object().shape({
    jobId: yup.string().required('ID da vaga é obrigatório')
  }),

   // Schema para candidatura a vaga
   detailsJobApplications: yup.object().shape({
    jobId: yup.string().required('ID da vaga é obrigatório')
  }),

  // Shema para desabilitar usuario
  admDesctiveUser: yup.object().shape({
    id: yup.string().required('ID do usuário é obrigatório')
  }),

  // Shema para pegar detaklhes do usuario
  admDetailsUser: yup.object().shape({
    id: yup.string().required('ID do usuário é obrigatório')
  })
}; 