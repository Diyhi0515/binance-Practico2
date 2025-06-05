import { Controller, Get, Param, UseGuards, ParseIntPipe, Post, Delete } from "@nestjs/common";
import { WalletsService } from "./wallets.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { GetUserId } from "../common/decorators/get-user-id.decorator";

@UseGuards(JwtAuthGuard)
@Controller("wallets")
export class WalletsController {
    constructor(private readonly walletsService: WalletsService) {}

    @Get()
    findAllByUser(@GetUserId() userId: number) {
        return this.walletsService.findAllByUser(userId);
    }

    @Get(":currencyId")
    findOne(@GetUserId() userId: number, @Param("currencyId", ParseIntPipe) currencyId: number) {
        return this.walletsService.findOne(userId, currencyId);
    }

    @Post(":currencyId")
    createWallet(@GetUserId() userId: number, @Param("currencyId", ParseIntPipe) currencyId: number) {
        return this.walletsService.getOrCreateWallet(userId, currencyId);
    }

    @Delete(":walletId")
    remove(@Param("walletId", ParseIntPipe) walletId: number) {
        return this.walletsService.remove(walletId);
    }
}
