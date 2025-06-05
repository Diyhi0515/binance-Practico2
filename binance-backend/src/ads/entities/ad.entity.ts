import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Currency } from "../../currencies/entities/currency.entity";

export type AdType = "BUY" | "SELL";

@Entity()
export class Ad {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "enum", enum: ["BUY", "SELL"] })
    type: AdType;

    @Column("decimal", { precision: 12, scale: 2 })
    price: number;

    @Column("decimal", { precision: 12, scale: 2 })
    amount: number;

    @Column({ type: "text", nullable: true })
    paymentDescription?: string;

    @Column({ nullable: true })
    paymentImage?: string | null;

    @ManyToOne(() => Currency, { eager: true })
    currency: Currency;

    @ManyToOne(() => User, user => user.ads, { eager: true })
    user: User;

    @CreateDateColumn()
    createdAt: Date;
}
