import express, { Request, Response, NextFunction } from 'express';

export interface MachineDTO {
    _id?: string;
    brand: string;
    name: string;
    type: string;
    power: number;
    weight: number;
    deposit: number;
    lease: number;
    company: string;
}

export function validateMachineDTO(req: Request, res: Response, next: NextFunction) {
    const machineData: MachineDTO = req.body;
    const requiredFields = ['brand', 'name', 'type', 'power', 'weight', 'deposit', 'lease', 'company'];
  
    for (const field of requiredFields) {
      if (!(field in machineData)) {
        return res.status(400).json({ error: `Missing required field: ${field}` });
      }
    }
  
    next();
  }