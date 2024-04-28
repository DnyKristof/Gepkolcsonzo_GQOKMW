import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    _id: string | undefined;
    @Column()
    start_date: Date | undefined;
    @Column()
    end_date: Date | undefined;
    @Column()
    amount: number | undefined;
    @Column()
    company_id: string | undefined;
}