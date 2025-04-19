// Esse arquivo define tipos para o express

declare namespace Express {
    export interface Request {
      user_id: string;
      user_type: string;
      user_email: string;
      user_name: string;
    }
  }