// src/index.js
import express, { Express, Request, Response,NextFunction} from "express";
import cors from "cors";
import { Mongo } from "./mongo";
import dotenv from "dotenv";
import { MachineDTO, validateMachineDTO } from "./models/MachineDTO";
import { CompanyDTO,RegisterCompanyDTO,validateRegisterCompanyDTO } from "./models/CompanyDTO";
import { RentalDTO,validateRentalDTO } from "./models/RentalDTO";
import { TransactionDTO,validateTransactionDTO } from "./models/TransactionDTO";

dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT;
const MyMongoClient = new Mongo();


app.get("/machine", async (req: Request, res: Response) => {
  try {
    const machines: MachineDTO[] = await MyMongoClient.getAllMachines();
    res.json(machines);
  } catch (error) {
    console.error('Error fetching machines:', error);
    res.status(500).json({ error: 'Failed to fetch machines' });
  }
});

app.post("/machine",validateMachineDTO, async (req: Request, res: Response) => {
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

app.post("/company",validateRegisterCompanyDTO, async (req: Request, res: Response) => {
  try {
    const companyData: RegisterCompanyDTO = req.body;
    const startingBalance = 15000;
    const companyToInsert: CompanyDTO = {
      company_reg_number: companyData.company_reg_number,
      headquarters: companyData.headquarters,
      name: companyData.name,
      representative: companyData.representative,
      taxnumber: companyData.taxnumber,
      balance: startingBalance,
      machines: []

    }

    const insertedCompany = await MyMongoClient.insertCompany(companyToInsert);

    const firstTransaction: TransactionDTO = {
      start_date: new Date(),
      end_date: new Date(),
      amount: startingBalance,
      company_id: insertedCompany.insertedId
    };
    const insertedTransaction = await MyMongoClient.insertTransaction(firstTransaction);

    console.log('Inserted company:', insertedCompany);
    res.status(201).json(insertedCompany);
  } catch (error) {
    console.error('Error inserting company:', error);
    res.status(500).json({ error: 'Failed to insert company' });
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

app.post("/rental",validateRentalDTO, async (req: Request, res: Response) => {
  try {
    const rentalData: RentalDTO = req.body;

    const insertedRental = await MyMongoClient.insertRental(rentalData);

    res.status(201).json(insertedRental);
  } catch (error) {
    console.error('Error inserting rental:', error);
    res.status(500).json({ error: 'Failed to insert rental' });
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

app.post("/transaction",validateTransactionDTO, async (req: Request, res: Response) => {
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