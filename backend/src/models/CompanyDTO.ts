import express, { Request, Response, NextFunction } from 'express';

export interface CompanyDTO {
    _id?: string;
    name: string;
    representative: string;
    taxnumber: string;
    company_reg_number: string;
    headquarters: string;
    balance: number;
    machines: string[];
}

export interface RegisterCompanyDTO {
    name: string;
    representative: string;
    taxnumber: string;
    company_reg_number: string;
    headquarters: string;

}

export function validateRegisterCompanyDTO(req: Request, res: Response, next: NextFunction) {
    const companyData: CompanyDTO = req.body;
    const requiredFields = ['name', 'representative', 'taxnumber', 'company_reg_number', 'headquarters',];

    for (const field of requiredFields) {
        if (!(field in companyData)) {
            return res.status(400).json({ error: `Missing required field: ${field}` });
        }
    }

    next();
}