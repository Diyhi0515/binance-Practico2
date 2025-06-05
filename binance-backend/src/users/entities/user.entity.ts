import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Wallet } from "../../wallets/entities/wallet.entity";
import { Ad } from "../../ads/entities/ad.entity";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ default: "user" }) // roles: 'user' | 'admin'
    role: string;

    @Column({ default: true })
    isActive: boolean;

    @OneToMany(() => Wallet, wallet => wallet.user)
    wallets: Wallet[];

    @OneToMany(() => Ad, ad => ad.user)
    ads: Ad[];
}
