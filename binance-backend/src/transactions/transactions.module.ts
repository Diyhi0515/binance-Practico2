import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TransactionsService } from "./transactions.service";
import { TransactionsController } from "./transactions.controller";
import { Transaction } from "./entities/transaction.entity";
import { Ad } from "../ads/entities/ad.entity";
import { User } from "../users/entities/user.entity";
import { Wallet } from "../wallets/entities/wallet.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Transaction, Ad, User, Wallet])],
    controllers: [TransactionsController],
    providers: [TransactionsService],
})
export class TransactionsModule {}
