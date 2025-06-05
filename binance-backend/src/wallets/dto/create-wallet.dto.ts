import { IsNumber } from "class-validator";

export class CreateWalletDto {
    @IsNumber()
    userId: number;

    @IsNumber()
    currencyId: number;
}
