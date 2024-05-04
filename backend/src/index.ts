// src/index.js
import express, { Express, Request, Response,NextFunction} from "express";
import cors from "cors";
import { Mongo } from "./mongo";
import dotenv from "dotenv";
import { MachineDTO, validateMachineDTO } from "./models/MachineDTO";
import { CompanyDTO,RegisterCompanyDTO,UpdateCompanyDTO,validateRegisterCompanyDTO } from "./models/CompanyDTO";
import { NewRentalDTO, RentalDTO,validateNewRentalDTO } from "./models/RentalDTO";
import { TransactionDTO,TransactionType,validateTransactionDTO } from "./models/TransactionDTO";
import { LoginDTO, validateLoginDTO } from "./models/LoginDTO";
import { RegisterDTO, validateRegisterDTO } from "./models/RegisterDTO";
import jwt from 'jsonwebtoken';


dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT;
const MyMongoClient = new Mongo();
const jwtSecret : string = process.env.JWT_SECRET || "secret";

function validateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.get("Authorization")
  if (!token) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  console.log('Token:', token)
  const toVerify = token.split(' ')[1];
  const tokenVerified = jwt.verify(toVerify, jwtSecret);
  next();
}

app.post("/login",validateLoginDTO, async (req: Request, res: Response) => {
  try {
    const loginData: LoginDTO = req.body;
    console.log('Login:', req.body)
    const token = await MyMongoClient.Login(loginData);
    console.log('Token:', token)
    if (!token) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }
    res.json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Failed to log in' });
  }
});

app.post("/register",validateRegisterDTO, async (req: Request, res: Response) => {
  try {
    const registerData: RegisterDTO = req.body;
    const result = await MyMongoClient.Register(registerData);
    res.json(result);
  } catch (error) {
    console.error('Error registering:', error);
    res.status(500).json({ error: 'Failed to register' });
  }
});

app.get("/machine", async (req: Request, res: Response) => {
  try {
    const machines: MachineDTO[] = await MyMongoClient.getAllMachines();
    res.json(machines);
  } catch (error) {
    console.error('Error fetching machines:', error);
    res.status(500).json({ error: 'Failed to fetch machines' });
  }
});

app.post("/machine",validateMachineDTO,validateToken, async (req: Request, res: Response) => {
  try {
    const machineData: MachineDTO = req.body;

    const insertedMachine = await MyMongoClient.insertMachine(machineData);

    console.log('Inserted machine:', insertedMachine);
    res.status(201).json(insertedMachine);
  } catch (error) {
    console.error('Error inserting machine:', error);
    res.status(500).json({ error: 'Failed to insert machine' });
  }
});

app.get("/company", async (req: Request, res: Response) => {
  try {
    const companies: CompanyDTO[] = await MyMongoClient.getAllCompanies();
    res.json(companies);
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).json({ error: 'Failed to fetch companies' });
  }
});

app.get("/company/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const company: CompanyDTO | null = await MyMongoClient.getCompanyById(id);
    if (!company) {
      res.status(404).json({ error: 'Company not found' });
      return;
    }
    res.json(company);
  } catch (error) {
    console.error('Error fetching company:', error);
    res.status(500).json({ error: 'Failed to fetch company' });
  }
});

app.post("/company",validateRegisterCompanyDTO,validateToken, async (req: Request, res: Response) => {
  try {
    const companyData: RegisterCompanyDTO = req.body;
    const startingBalance = 15000;
    const companyToInsert: CompanyDTO = {
      company_reg_number: companyData.company_reg_number,
      headquarters: companyData.headquarters,
      name: companyData.name,
      representative: companyData.representative,
      taxnumber: companyData.taxnumber,
      balance: 0,
      machines: []

    }

    const insertedCompany = await MyMongoClient.insertCompany(companyToInsert);

    const firstTransaction: TransactionDTO = {
      start_date: new Date(),
      end_date: new Date(),
      amount: startingBalance,
      company_id: insertedCompany.insertedId,
      type: TransactionType.CASH_IN
    };
    const insertedTransaction = await MyMongoClient.insertTransaction(firstTransaction);

    console.log('Inserted company:', insertedCompany);
    res.status(201).json(insertedCompany);
  } catch (error) {
    console.error('Error inserting company:', error);
    res.status(500).json({ error: 'Failed to insert company' });
  }
});

app.put("/company/:id",validateRegisterCompanyDTO,validateToken, async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const companyData: UpdateCompanyDTO = req.body;

    const updated = await MyMongoClient.updateCompany(companyData, id);
    if (!updated) {
      res.status(404).json({ error: 'Company not found' });
      return;
    }

    res.json({ message: 'Company updated' });
  } catch (error) {
    console.error('Error updating company:', error);
    res.status(500).json({ error: 'Failed to update company' });
  }
});


app.get("/rental", async (req: Request, res: Response) => {
  try {
    const rentals: RentalDTO[] = await MyMongoClient.getAllRentals();
    res.json(rentals);
  } catch (error) {
    console.error('Error fetching rentals:', error);
    res.status(500).json({ error: 'Failed to fetch rentals' });
  }
});

app.get("/rental/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const rental: RentalDTO | null = await MyMongoClient.getRentalById(id);
    if (!rental) {
      res.status(404).json({ error: 'Rental not found' });
      return;
    }
    res.json(rental);
  } catch (error) {
    console.error('Error fetching rental:', error);
    res.status(500).json({ error: 'Failed to fetch rental' });
  }
});

app.post("/rental",validateNewRentalDTO,validateToken, async (req: Request, res: Response) => {
  try {
    const rentalData: NewRentalDTO = req.body;
    const machine = await MyMongoClient.getMachineById(rentalData.machine_id);
    if (!machine) {
      res.status(404).json({ error: 'Machine not found' });
      return;
    }
    const company = await MyMongoClient.getCompanyById(rentalData.company_id);
    if (!company) {
      res.status(404).json({ error: 'Company not found' });
      return;
    }
    if(company.balance < -50000){
      res.status(400).json({ error: 'Company is in debt' });
      return;
    }

    const rental: RentalDTO = {
      start_date: new Date(),
      end_date: null,
      machine: machine.name,
      machine_id: rentalData.machine_id,
      company: company.name,
      company_id: rentalData.company_id,
      return_condition: null
    };

    const updatedMachine = await MyMongoClient.newMachineCompany(rentalData.machine_id, rentalData.company_id);
    if (!updatedMachine) {
      res.status(500).json({ error: 'Failed to update machine' });
      return;
    }
    const updatedCompany = await MyMongoClient.newCompanyMachine(rentalData.company_id, rentalData.machine_id);
    if (!updatedCompany) {
      res.status(500).json({ error: 'Failed to update company' });
      return;
    }

    const insertedRental = await MyMongoClient.insertRental(rental);

    res.status(201).json(insertedRental);
  } catch (error) {
    console.error('Error inserting rental:', error);
    res.status(500).json({ error: 'Failed to insert rental' });
  }
});

app.post("/rental/:id/end",validateToken, async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const returnCondition = req.body.return_condition;

    const updatedRental = await MyMongoClient.endRental(id, returnCondition);
    if (!updatedRental) {
      res.status(500).json({ error: 'Failed to update rental' });
      return;
    }

    const rental = await MyMongoClient.getRentalById(id);
    if (!rental) {
      res.status(404).json({ error: 'Rental not found' });
      return;
    }

    const machine = await MyMongoClient.getMachineById(rental.machine_id);
    if (!machine) {
      res.status(404).json({ error: 'Machine not found' });
      return;
    }
    machine.company = '';

    const updatedMachine = await MyMongoClient.updateMachine(machine, rental.machine_id);
    if (!updatedMachine) {
      res.status(500).json({ error: 'Failed to update machine' });
      return;
    }
    const company = await MyMongoClient.getCompanyById(rental.company_id);
    if (!company) {
      res.status(404).json({ error: 'Company not found' });
      return;
    }
    const newMachines = company.machines.filter(machineId => machineId !== rental.machine_id);

    const updatedCompany = await MyMongoClient.updateCompanyMachines(rental.company_id, newMachines);

    const elapsedTime = rental.end_date!.getTime() - rental.start_date.getTime();
    const elapsedDays = elapsedTime / (1000 * 60 * 60 * 24);

    const transactionAmount = machine.lease * elapsedDays + machine.deposit * (returnCondition ? 0 : 1);

    const transaction: TransactionDTO = {
      start_date: rental.start_date,
      end_date: rental.end_date!,
      amount: -transactionAmount,
      company_id: company._id || '',
      type: TransactionType.CASH_OUT
    };

    const insertedTransaction = await MyMongoClient.insertTransaction(transaction);



    res.json({ message: 'Rental ended' });
  } catch (error) {
    console.error('Error ending rental:', error);
    res.status(500).json({ error: 'Failed to end rental' });
  }
});

app.get("/transaction", async (req: Request, res: Response) => {
  try {
    const transactions: TransactionDTO[] = await MyMongoClient.getAllTransactions();
    res.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
}
);

app.get("/transaction/:company_id", async (req: Request, res: Response) => {
  try {
    const company_id = req.params.company_id;
    const transaction: TransactionDTO[] = await MyMongoClient.getTransactionByCompanyId(company_id);
    if (!transaction) {
      res.status(404).json({ error: 'Company not found' });
      return;
    }
    res.json(transaction);
  } catch (error) {
    console.error('Error fetching transaction:', error);
    res.status(500).json({ error: 'Failed to fetch transaction' });
  }
});

app.post("/transaction",validateTransactionDTO,validateToken, async (req: Request, res: Response) => {
  try {
    const transactionData: TransactionDTO = req.body;

    const insertedTransaction = await MyMongoClient.insertTransaction(transactionData);

    console.log('Inserted transaction:', insertedTransaction);
    res.status(201).json(insertedTransaction);
  } catch (error) {
    console.error('Error inserting transaction:', error);
    res.status(500).json({ error: 'Failed to insert transaction' });
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});