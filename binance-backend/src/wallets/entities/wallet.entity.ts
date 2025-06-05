import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Currency } from "../../currencies/entities/currency.entity";

@Entity()
@Unique(["user", "currency"])
export class Wallet {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.wallets)
    user: User;

    @ManyToOne(() => Currency)
    currency: Currency;

    @Column("decimal", { precision: 15, scale: 2, default: 0 })
    balance: number;
}
