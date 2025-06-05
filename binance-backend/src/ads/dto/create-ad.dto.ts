import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateAdDto {
    @IsEnum(["BUY", "SELL"])
    type: "BUY" | "SELL";

    @IsNumber()
    price: number;

    @IsNumber()
    amount: number;

    @IsOptional()
    @IsString()
    paymentDescription?: string;

    @IsOptional()
    @IsString()
    paymentImage?: string;

    @IsNumber()
    currencyId: number;
}
