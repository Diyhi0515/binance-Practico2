import { IsNumber, Min } from "class-validator";

export class CreateTransferDto {
    @IsNumber()
    fromWalletId: number;

    @IsNumber()
    toWalletId: number;

    @IsNumber()
    @Min(0.01, { message: "El monto debe ser mayor a cero" })
    amount: number;
}
