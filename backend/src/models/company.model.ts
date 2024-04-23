import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Machine } from "./machine.model";

@Entity()
export class Company {
    @PrimaryGeneratedColumn()
    id: string | undefined;
    @Column()
    name: string | undefined;
    @Column()
    representative: string | undefined;
    @Column()
    taxnumber: string | undefined;
    @Column()
    company_reg_number: string | undefined;
    @Column()
    headquarters: string | undefined;
    @Column()
    balance : number | undefined;
    @OneToMany(() => Machine, machine => machine.company)
    machines: Machine[] | undefined;

}