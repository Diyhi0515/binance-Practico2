import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Currency {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    symbol: string; // $, ₿, etc.

    @Column({ unique: true })
    code: string; // USD, BTC, etc.

    @Column("float")
    valorEnSus: number;

    @Column({ default: true })
    isActive: boolean;
}
