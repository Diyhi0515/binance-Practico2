import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { Ad } from "../../ads/entities/ad.entity";
import { User } from "../../users/entities/user.entity";

export type TransactionStatus = "PENDING" | "COMPLETED" | "CANCELLED";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Ad, { eager: true })
    ad: Ad;

    @ManyToOne(() => User, { eager: true })
    buyer: User; // quien realiza el pago

    @ManyToOne(() => User, { eager: true })
    seller: User; // quien entrega la moneda

    @Column("decimal", { precision: 12, scale: 2 })
    amount: number;

    @Column({ type: "enum", enum: ["PENDING", "COMPLETED", "CANCELLED"], default: "PENDING" })
    status: TransactionStatus;

    @Column({ nullable: true })
    proofImage: string; // comprobante de pago

    @Column({ nullable: true })
    comment: string; // texto alternativo al comprobante

    @CreateDateColumn()
    createdAt: Date;
}
