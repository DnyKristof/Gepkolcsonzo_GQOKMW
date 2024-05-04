import express, { Request, Response, NextFunction } from 'express';

export interface RegisterDTO{
    username: string;
    password: string;
    email: string;
}

export function validateRegisterDTO(req: Request, res: Response, next: NextFunction){
 
        const registerData: RegisterDTO = req.body;
        const requiredFields = ['username', 'password', 'email'];

        for (const field of requiredFields) {
            if (!(field in registerData)) {
              return res.status(400).json({ error: `Missing required field: ${field}` });
            }
          }
        next();
}