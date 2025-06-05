import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WalletsService } from "./wallets.service";
import { WalletsController } from "./wallets.controller";
import { Wallet } from "./entities/wallet.entity";
import { User } from "../users/entities/user.entity";
import { Currency } from "../currencies/entities/currency.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Wallet, User, Currency])],
    controllers: [WalletsController],
    providers: [WalletsService],
    exports: [WalletsService],
})
export class WalletsModule {}
