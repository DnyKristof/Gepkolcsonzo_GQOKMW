import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne } from "typeorm"

export class Rental {
    @PrimaryGeneratedColumn()
    _id: string | undefined;
    @Column()
    start_date: Date | undefined;
    @Column()
    end_date: Date | undefined;
    @Column()
    machine_id: string | undefined;
    @Column()
    company :string | undefined;
    @Column()
    return_condition: boolean | undefined;

}