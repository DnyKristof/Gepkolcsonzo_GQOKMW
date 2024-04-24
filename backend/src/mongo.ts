import { MongoClient, Db, Collection, InsertOneResult } from 'mongodb';
import dotenv from "dotenv";
import { MachineDTO } from './models/MachineDTO';
import { CompanyDTO } from './models/CompanyDTO';
import { RentalDTO } from './models/RentalDTO';
import { TransactionDTO } from './models/TransactionDTO';
dotenv.config();

export class Mongo {
    private client: MongoClient;
    private db: Db | undefined;
    private uri: string = process.env.MONGO_URI || 'mongodb://localhost:27017';
    private dbName: string = process.env.MONGO_DB_NAME || 'test';

    constructor() {
        this.client = new MongoClient(this.uri);
        this.client.connect()
            .then((connectedClient: MongoClient) => {
                console.log('Connected to MongoDB');
                this.client = connectedClient;
                this.db = this.client.db(this.dbName);
            })
            .catch(err => {
                console.error('Error connecting to MongoDB:', err);
            });
    }

    private generateIndex(): string {
        const randomNumber = Math.floor(Math.random() * 1000000);
        return randomNumber.toString().padStart(6, '0');
      }

    private async getMachineCollection(): Promise<Collection<MachineDTO>> {

        return this.db!.collection<MachineDTO>('machines');
    }

    async getAllMachines(): Promise<MachineDTO[]> {
        const machinesCollection = await this.getMachineCollection();
        return machinesCollection.find().toArray();
    }

    async insertMachine(machine: MachineDTO): Promise<InsertOneResult<MachineDTO>> {
        const machinesCollection = await this.getMachineCollection();
        machine._id = this.generateIndex();
        const result = await machinesCollection.insertOne(machine);
        return result;
    }

    private async getCompanyCollection(): Promise<Collection<CompanyDTO>> {
        return this.db!.collection<CompanyDTO>('companies');
    }

    async getAllCompanies(): Promise<CompanyDTO[]> {
        const companiesCollection = await this.getCompanyCollection();
        return companiesCollection.find().toArray();
    }

    async insertCompany(company: CompanyDTO): Promise<InsertOneResult<CompanyDTO>> {
        const companiesCollection = await this.getCompanyCollection();
        company._id = this.generateIndex();
        const result = await companiesCollection.insertOne(company);
        return result;
    }

    private async getRentalCollection(): Promise<Collection<RentalDTO>> {
        return this.db!.collection<RentalDTO>('rentals');
    }

    async getAllRentals(): Promise<RentalDTO[]> {
        const rentalsCollection = await this.getRentalCollection();
        return rentalsCollection.find().toArray();
    }

    async insertRental(rental: RentalDTO): Promise<InsertOneResult<RentalDTO>> {
        const rentalsCollection = await this.getRentalCollection();
        rental._id = this.generateIndex();
        const result = await rentalsCollection.insertOne(rental);
        return result;
    }

    private async getTransactionCollection(): Promise<Collection<TransactionDTO>> {
        return this.db!.collection<TransactionDTO>('transactions');
    }

    async getAllTransactions(): Promise<TransactionDTO[]> {
        const transactionsCollection = await this.getTransactionCollection();
        return transactionsCollection.find().toArray();
    }

    async insertTransaction(transaction: TransactionDTO): Promise<InsertOneResult<TransactionDTO>> {
        const transactionsCollection = await this.getTransactionCollection();
        transaction._id = this.generateIndex();
        const result = await transactionsCollection.insertOne(transaction);
        return result;
    }
}