import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdsService } from "./ads.service";
import { AdsController } from "./ads.controller";
import { Ad } from "./entities/ad.entity";
import { Currency } from "../currencies/entities/currency.entity";
import { User } from "../users/entities/user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Ad, Currency, User])],
    controllers: [AdsController],
    providers: [AdsService],
})
export class AdsModule {}
