import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

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
}
