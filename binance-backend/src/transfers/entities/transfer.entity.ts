import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { Wallet } from "../../wallets/entities/wallet.entity";

@Entity()
export class Transfer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("decimal", { precision: 18, scale: 8 })
    amount: number;

    @ManyToOne(() => Wallet, { eager: true })
    fromWallet: Wallet;

    @ManyToOne(() => Wallet, { eager: true })
    toWallet: Wallet;

    @CreateDateColumn()
    createdAt: Date;

    @Column("decimal", { precision: 10, scale: 2 })
    amountConverted: number;
}
