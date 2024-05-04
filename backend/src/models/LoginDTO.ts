import express, { Request, Response, NextFunction } from 'express';

export interface LoginDTO {
    username: string;
    password: string;
}

export function validateLoginDTO(req: Request, res: Response, next: NextFunction){
 
    const registerData: LoginDTO = req.body;
    const requiredFields = ['username', 'password'];

    for (const field of requiredFields) {
        if (!(field in registerData)) {
          return res.status(400).json({ error: `Missing required field: ${field}` });
        }
      }
    next();
}