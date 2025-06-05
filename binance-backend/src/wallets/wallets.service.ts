import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Wallet } from "./entities/wallet.entity";
import { User } from "../users/entities/user.entity";
import { Currency } from "../currencies/entities/currency.entity";

@Injectable()
export class WalletsService {
    constructor(
        @InjectRepository(Wallet)
        private readonly walletRepository: Repository<Wallet>,

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        @InjectRepository(Currency)
        private readonly currencyRepository: Repository<Currency>,
    ) {}

    async findAllByUser(userId: number): Promise<Wallet[]> {
        return this.walletRepository.find({
            where: { user: { id: userId } },
            relations: ["currency"],
        });
    }

    async findOne(userId: number, currencyId: number): Promise<Wallet> {
        const wallet = await this.walletRepository.findOne({
            where: {
                user: { id: userId },
                currency: { id: currencyId },
            },
            relations: ["currency"],
        });
        if (!wallet) throw new NotFoundException("Wallet not found");
        return wallet;
    }

    async getOrCreateWallet(userId: number, currencyId: number): Promise<Wallet> {
        let wallet = await this.walletRepository.findOne({
            where: {
                user: { id: userId },
                currency: { id: currencyId },
            },
            relations: ["currency"],
        });

        if (!wallet) {
            const user = await this.userRepository.findOneBy({ id: userId });
            const currency = await this.currencyRepository.findOneBy({ id: currencyId });

            if (!user || !currency) {
                throw new NotFoundException("User or currency not found");
            }

            wallet = this.walletRepository.create({
                user,
                currency,
                balance: 0,
            });
            await this.walletRepository.save(wallet);
        }

        return wallet;
    }
    async create(userId: number, currencyId: number): Promise<Wallet> {
        const user = await this.userRepository.findOneBy({ id: userId });
        const currency = await this.currencyRepository.findOneBy({ id: currencyId });

        if (!user || !currency) {
            throw new NotFoundException("Usuario o moneda no encontrada");
        }

        const existing = await this.walletRepository.findOne({
            where: { user: { id: userId }, currency: { id: currencyId } },
        });

        if (existing) {
            throw new Error("El usuario ya tiene una billetera con esta moneda");
        }

        const wallet = this.walletRepository.create({ user, currency, balance: 0 });
        return this.walletRepository.save(wallet);
    }
    async findAll(): Promise<Wallet[]> {
        return this.walletRepository.find({ relations: ["user", "currency"] });
    }
    async remove(id: number): Promise<void> {
        const wallet = await this.walletRepository.findOneBy({ id });
        if (!wallet) throw new NotFoundException("Billetera no encontrada");
        await this.walletRepository.remove(wallet);
    }
}
