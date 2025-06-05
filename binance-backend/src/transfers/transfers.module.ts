import { Module } from "@nestjs/common";
import { TransfersService } from "./transfers.service";
import { TransfersController } from "./transfers.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Transfer } from "./entities/transfer.entity";
import { Wallet } from "../wallets/entities/wallet.entity";
import { WalletsModule } from "../wallets/wallets.module";

@Module({
    imports: [TypeOrmModule.forFeature([Transfer, Wallet]), WalletsModule],
    controllers: [TransfersController],
    providers: [TransfersService],
})
export class TransfersModule {}
