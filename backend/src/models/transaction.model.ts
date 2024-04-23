import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: string | undefined;
    @Column()
    start_date: Date | undefined;
    @Column()
    end_date: Date | undefined;
    @Column()
    amount: number | undefined;
}