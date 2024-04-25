import express, { Request, Response, NextFunction } from 'express';

export interface TransactionDTO {
    _id?: string;
    start_date: Date;
    end_date: Date;
    amount: number;
    company_id: string;
}

export function validateTransactionDTO(req: Request, res: Response, next: NextFunction) {
    const transactionData: TransactionDTO = req.body;
    const requiredFields = ['start_date', 'end_date', 'amount', 'company_id'];

    for (const field of requiredFields) {
        if (!(field in transactionData)) {
            return res.status(400).json({ error: `Missing required field: ${field}` });
        }
    }

    next();
}