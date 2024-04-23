import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne } from "typeorm"
import { Company } from "./company.model";

@Entity()
export class Machine {
    @PrimaryGeneratedColumn()
    id: string | undefined;
    @Column()
    brand: string | undefined;
    @Column()
    name: string | undefined;
    @Column()
    type: string | undefined;
    @Column()
    power: number | undefined;
    @Column()
    weight: number | undefined;
    @Column()
    deposit: number | undefined;
    @Column()
    lease: number | undefined;
    @ManyToOne(() => Company, company => company.id)
    company: Company | undefined;
}
