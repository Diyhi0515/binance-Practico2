import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { CurrenciesModule } from "./currencies/currencies.module";
import { WalletsModule } from "./wallets/wallets.module";
import { TransactionsModule } from "./transactions/transactions.module";
import { AdsModule } from "./ads/ads.module";
import { PaymentProofsModule } from "./payment-proofs/payment-proofs.module";
import { TransfersModule } from "./transfers/transfers.module";
import { InjectDataSource, TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { User } from "./users/entities/user.entity";
import { Wallet } from "./wallets/entities/wallet.entity";
import { Currency } from "./currencies/entities/currency.entity";
import { Transaction } from "./transactions/entities/transaction.entity";
import { Ad } from "./ads/entities/ad.entity";
import { PaymentProof } from "./payment-proofs/entities/payment-proof.entity";
import { Transfer } from "./transfers/entities/transfer.entity";
import { DataSource } from "typeorm";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                type: "mysql",
                host: config.get("DB_HOST"),
                port: parseInt(config.get<string>("DB_PORT") ?? "3306", 10),
                username: config.get("DB_USERNAME"),
                password: config.get("DB_PASSWORD"),
                database: config.get("DB_NAME"),
                entities: [User, Wallet, Currency, Transaction, Ad, PaymentProof, Transfer],
                synchronize: true,
            }),
        }),
        UsersModule,
        AuthModule,
        CurrenciesModule,
        WalletsModule,
        TransactionsModule,
        AdsModule,
        PaymentProofsModule,
        TransfersModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    constructor(@InjectDataSource() private readonly dataSource: DataSource) {}
}
