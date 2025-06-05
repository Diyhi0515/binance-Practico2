import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Transaction } from "./entities/transaction.entity";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { Ad } from "../ads/entities/ad.entity";
import { User } from "../users/entities/user.entity";
import { Wallet } from "../wallets/entities/wallet.entity";

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Transaction) private transactionRepo: Repository<Transaction>,
        @InjectRepository(Ad) private adRepo: Repository<Ad>,
        @InjectRepository(User) private userRepo: Repository<User>,
        @InjectRepository(Wallet) private walletRepo: Repository<Wallet>,
    ) {}

    async create(dto: CreateTransactionDto, buyerId: number) {
        const ad = await this.adRepo.findOne({ where: { id: dto.adId }, relations: ["user", "currency"] });
        if (!ad) throw new NotFoundException("Anuncio no encontrado");

        if (ad.user.id === buyerId) {
            throw new BadRequestException("No puedes comprar tu propio anuncio");
        }

        const buyer = await this.userRepo.findOne({ where: { id: buyerId } });
        if (!buyer) throw new NotFoundException("Comprador no encontrado");

        const seller = ad.user;
        if (!seller) throw new NotFoundException("Vendedor no encontrado");

        const transaction = this.transactionRepo.create({
            ad,
            buyer,
            seller,
            amount: dto.amount,
            status: "PENDING",
        });

        return this.transactionRepo.save(transaction);
    }

    async complete(id: number, userId: number) {
        const tx = await this.transactionRepo.findOne({
            where: { id },
            relations: ["buyer", "seller", "ad", "ad.currency"],
        });
        if (!tx) throw new NotFoundException("Transacción no encontrada");
        if (tx.status !== "PENDING") throw new BadRequestException("La transacción ya está cerrada");
        if (tx.seller.id !== userId) throw new ForbiddenException("Solo el vendedor puede completar esta transacción");

        const buyerWallet = await this.walletRepo.findOne({
            where: { user: { id: tx.buyer.id }, currency: { id: tx.ad.currency.id } },
            relations: ["currency", "user"],
        });
        const sellerWallet = await this.walletRepo.findOne({
            where: { user: { id: tx.seller.id }, currency: { id: tx.ad.currency.id } },
            relations: ["currency", "user"],
        });

        if (!sellerWallet || !buyerWallet) throw new NotFoundException("Billeteras no encontradas");

        if (sellerWallet.balance < tx.amount) {
            throw new BadRequestException("Saldo insuficiente del vendedor");
        }

        sellerWallet.balance -= tx.amount;
        buyerWallet.balance += tx.amount;

        await this.walletRepo.save([sellerWallet, buyerWallet]);

        tx.status = "COMPLETED";
        return this.transactionRepo.save(tx);
    }

    async cancel(id: number, userId: number) {
        const tx = await this.transactionRepo.findOne({ where: { id }, relations: ["buyer", "seller"] });
        if (!tx) throw new NotFoundException("Transacción no encontrada");
        if (tx.status !== "PENDING") throw new BadRequestException("La transacción ya está cerrada");

        if (tx.buyer.id !== userId && tx.seller.id !== userId) {
            throw new ForbiddenException("No autorizado");
        }

        tx.status = "CANCELLED";
        return this.transactionRepo.save(tx);
    }

    async uploadProof(id: number, filename: string, userId: number) {
        const tx = await this.transactionRepo.findOne({ where: { id }, relations: ["buyer"] });
        if (!tx) throw new NotFoundException("Transacción no encontrada");

        if (tx.buyer.id !== userId) {
            throw new ForbiddenException("Solo el comprador puede subir el comprobante");
        }

        tx.proofImage = `/uploads/${filename}`;
        return this.transactionRepo.save(tx);
    }

    findAll() {
        return this.transactionRepo.find({ order: { createdAt: "DESC" } });
    }

    findUserTransactions(userId: number) {
        return this.transactionRepo.find({
            where: [{ buyer: { id: userId } }, { seller: { id: userId } }],
            order: { createdAt: "DESC" },
        });
    }
}
