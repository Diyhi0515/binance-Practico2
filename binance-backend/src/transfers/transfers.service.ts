import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Transfer } from "./entities/transfer.entity";
import { Repository } from "typeorm";
import { CreateTransferDto } from "./dto/create-transfer.dto";
import { Wallet } from "../wallets/entities/wallet.entity";

@Injectable()
export class TransfersService {
    constructor(
        @InjectRepository(Transfer) private transferRepo: Repository<Transfer>,
        @InjectRepository(Wallet) private walletRepo: Repository<Wallet>,
    ) {}

    async create(dto: CreateTransferDto) {
        const { fromWalletId, toWalletId, amount } = dto;

        if (fromWalletId === toWalletId) {
            throw new BadRequestException("No puedes transferir a la misma billetera.");
        }

        const fromWallet = await this.walletRepo.findOne({
            where: { id: fromWalletId },
            relations: ["currency"],
        });
        const toWallet = await this.walletRepo.findOne({
            where: { id: toWalletId },
            relations: ["currency"],
        });

        if (!fromWallet || !toWallet) {
            throw new NotFoundException("Una o ambas billeteras no existen.");
        }

        if (amount <= 0) {
            throw new BadRequestException("El monto debe ser mayor a cero.");
        }

        if (fromWallet.balance < amount) {
            throw new BadRequestException("Saldo insuficiente.");
        }

        const montoEnSus = amount * fromWallet.currency.valorEnSus;
        const montoConvertido = montoEnSus / toWallet.currency.valorEnSus;

        fromWallet.balance -= amount;
        toWallet.balance += montoConvertido;

        await this.walletRepo.save([fromWallet, toWallet]);

        const transfer = this.transferRepo.create({
            amount,
            amountConverted: montoConvertido,
            fromWallet,
            toWallet,
        });
        return this.transferRepo.save(transfer);
    }

    findAll() {
        return this.transferRepo.find({ order: { createdAt: "DESC" } });
    }

    findOne(id: number) {
        return this.transferRepo.findOne({ where: { id } });
    }
}
