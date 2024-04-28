import express, { Request, Response, NextFunction } from 'express';

export interface RentalDTO {
    _id?: string;
    start_date: Date;
    end_date: Date;
    machine: string;
    return_condition: boolean;
}

export interface NewRentalDTO {
    start_date: Date;
    company: string;
    machine: string;
}

export function validateRentalDTO(req: Request, res: Response, next: NextFunction) {
    const rentalData: RentalDTO = req.body;
    const requiredFields = ['start_date', 'machine', 'company'];

    for (const field of requiredFields) {
        if (!(field in rentalData)) {
            return res.status(400).json({ error: `Missing required field: ${field}` });
        }
    }

    next();
}