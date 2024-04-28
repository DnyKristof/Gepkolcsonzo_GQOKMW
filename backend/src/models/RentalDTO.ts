import express, { Request, Response, NextFunction } from 'express';

export interface RentalDTO {
    _id?: string;
    start_date: Date;
    end_date: Date | null;
    machine: string;
    machine_id: string;
    company: string;
    company_id: string;
    return_condition: boolean | null;
}

export interface NewRentalDTO {
    company_id: string;
    machine_id: string;
}

export interface EndRentalDTO {
    company_id: string;
    machine_id: string;
    return_condition: boolean;
}

export function validateNewRentalDTO(req: Request, res: Response, next: NextFunction) {
    const rentalData: RentalDTO = req.body;
    const requiredFields = [ 'machine_id', 'company_id'];

    for (const field of requiredFields) {
        if (!(field in rentalData)) {
            return res.status(400).json({ error: `Missing required field: ${field}` });
        }
    }

    next();
}