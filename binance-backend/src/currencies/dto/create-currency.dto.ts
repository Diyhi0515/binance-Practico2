import { IsString, IsBoolean, IsOptional, IsNumber, Min } from "class-validator";

export class CreateCurrencyDto {
    @IsString()
    name: string;

    @IsString()
    symbol: string;

    @IsString()
    code: string;

    @IsNumber()
    @Min(0)
    valorEnSus: number;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}
