import { MongoClient, Db, Collection, InsertOneResult } from 'mongodb';
import dotenv from "dotenv";
import { MachineDTO } from './models/MachineDTO';
import { CompanyDTO, UpdateCompanyDTO } from './models/CompanyDTO';
import { RentalDTO } from './models/RentalDTO';
import { TransactionDTO } from './models/TransactionDTO';
import { get } from 'http';
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

    async getMachineById(id: string): Promise<MachineDTO | null> {
        const machinesCollection = await this.getMachineCollection();
        return machinesCollection.findOne({ _id: id });
    }

    async updateMachine(machine: MachineDTO, id: string): Promise<boolean> {
        const machinesCollection = await this.getMachineCollection();
        const result = await machinesCollection.replaceOne({ _id: id }, machine);
        return result.modifiedCount === 1;
    }

    async newMachineCompany(machineId: string, companyId: string): Promise<boolean> {
        const machinesCollection = await this.getMachineCollection();
        const machine = await this.getMachineById(machineId);
        if (machine) {
            if (machine.company) {
                throw new Error('Machine already rented');
            }
            machine.company = companyId;
            const result = await machinesCollection.replaceOne({ _id: machineId }, machine);
            return result.modifiedCount === 1;
        }
        return false;
    }

    private async getCompanyCollection(): Promise<Collection<CompanyDTO>> {
        return this.db!.collection<CompanyDTO>('companies');
    }

    async getAllCompanies(): Promise<CompanyDTO[]> {
        const companiesCollection = await this.getCompanyCollection();
        return companiesCollection.find().toArray();
    }

    async getCompanyById(id: string): Promise<CompanyDTO | null> {
        const companiesCollection = await this.getCompanyCollection();
        return companiesCollection.findOne({ _id: id });
    }

    async insertCompany(company: CompanyDTO): Promise<InsertOneResult<CompanyDTO>> {
        const companiesCollection = await this.getCompanyCollection();
        company._id = this.generateIndex();
        const result = await companiesCollection.insertOne(company);
        return result;
    }

    async updateCompany(company: UpdateCompanyDTO, id: string): Promise<boolean> {
        const companiesCollection = await this.getCompanyCollection();
        const companyToUpdate = await this.getCompanyById(id);
        if (companyToUpdate) {
            companyToUpdate.name = company.name;
            companyToUpdate.representative = company.representative;
            companyToUpdate.taxnumber = company.taxnumber;
            companyToUpdate.company_reg_number = company.company_reg_number;
            companyToUpdate.headquarters = company.headquarters;
            companyToUpdate.balance = companyToUpdate.balance;
            const result = await companiesCollection.replaceOne({ _id: id }, companyToUpdate);
            return result.modifiedCount === 1;
        }
        return false;
    }

    async updateCompanyMachines(companyId: string, machines: string[]): Promise<boolean> {
        const companiesCollection = await this.getCompanyCollection();
        const companyToUpdate = await this.getCompanyById(companyId);
        if (companyToUpdate) {
            companyToUpdate.machines = machines;
            const result = await companiesCollection.replaceOne({ _id: companyId }, companyToUpdate);
            return result.modifiedCount === 1;
        }
        return false;
    }

    async newCompanyMachine(companyId: string, machineId: string): Promise<boolean> {
        const companiesCollection = await this.getCompanyCollection();
        const company = await this.getCompanyById(companyId);
        if (company) {
            company.machines.push(machineId);
            const result = await companiesCollection.replaceOne({ _id: companyId }, company);
            return result.modifiedCount === 1;
        }
        return false;
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

    async getRentalById(id: string): Promise<RentalDTO | null> {
        const rentalsCollection = await this.getRentalCollection();
        return rentalsCollection.findOne({ _id: id });
    }

    async endRental(id: string,return_condition : boolean): Promise<boolean> {
        const rentalsCollection = await this.getRentalCollection();
        const rental = await this.getRentalById(id);
        if (rental) {
            rental.end_date = new Date();
            rental.return_condition = return_condition;
            const result = await rentalsCollection.replaceOne({ _id: id }, rental);
            return result.modifiedCount === 1;
        }
        return false;
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

        const companiesCollection = await this.getCompanyCollection();
        const company = await this.getCompanyById(transaction.company_id);
        if (company) {
            company.balance += transaction.amount;
            await companiesCollection.replaceOne({ _id: transaction.company_id }, company);
        }
        return result;
    }

    async getTransactionByCompanyId(id: string): Promise<TransactionDTO[]> {
        const transactionsCollection = await this.getTransactionCollection();
        return transactionsCollection.find({ company_id: id }).toArray();
    }
}