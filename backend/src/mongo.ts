import { MongoClient, Db, Collection } from 'mongodb';
import { Machine } from './models/machine.model';
import dotenv from "dotenv";
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

    private async getMachineCollection(): Promise<Collection<Machine>> {

        return this.db!.collection<Machine>('machines');
    }

    async getAllMachines(): Promise<Machine[]> {
        const machinesCollection = await this.getMachineCollection();
        return machinesCollection.find().toArray();
    }
}