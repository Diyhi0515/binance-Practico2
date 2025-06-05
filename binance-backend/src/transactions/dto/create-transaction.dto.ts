import { IsNumber, IsPositive } from "class-validator";

export class CreateTransactionDto {
    @IsNumber()
    adId: number;

    @IsNumber()
    @IsPositive()
    amount: number;
}
