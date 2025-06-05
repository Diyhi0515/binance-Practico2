import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Currency } from "./entities/currency.entity";
import { CreateCurrencyDto } from "./dto/create-currency.dto";
import { UpdateCurrencyDto } from "./dto/update-currency.dto";

@Injectable()
export class CurrenciesService {
    constructor(
        @InjectRepository(Currency)
        private readonly currencyRepository: Repository<Currency>,
    ) {}

    async create(createCurrencyDto: CreateCurrencyDto): Promise<Currency> {
        const currency = this.currencyRepository.create(createCurrencyDto);
        return this.currencyRepository.save(currency);
    }

    findAll(): Promise<Currency[]> {
        return this.currencyRepository.find();
    }

    async findOne(id: number): Promise<Currency> {
        const currency = await this.currencyRepository.findOneBy({ id });
        if (!currency) throw new NotFoundException(`Currency ${id} not found`);
        return currency;
    }

    async update(id: number, updateDto: UpdateCurrencyDto): Promise<Currency> {
        const currency = await this.findOne(id);
        Object.assign(currency, updateDto);
        return this.currencyRepository.save(currency);
    }

    async remove(id: number): Promise<void> {
        await this.currencyRepository.delete(id);
    }
}
