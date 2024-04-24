// src/index.js
import express, { Express, Request, Response,NextFunction} from "express";
import { Mongo } from "./mongo";
import dotenv from "dotenv";
import { MachineDTO, validateMachineDTO } from "./models/MachineDTO";
import { CompanyDTO,validateCompanyDTO } from "./models/CompanyDTO";
import { RentalDTO,validateRentalDTO } from "./models/RentalDTO";
import { TransactionDTO,validateTransactionDTO } from "./models/TransactionDTO";

dotenv.config();

const app: Express = express();
app.use(express.json());
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

app.post("/company",validateCompanyDTO, async (req: Request, res: Response) => {
  try {
    const companyData: CompanyDTO = req.body;

    const insertedCompany = await MyMongoClient.insertCompany(companyData);

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