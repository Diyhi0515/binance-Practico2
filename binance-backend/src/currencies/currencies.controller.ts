import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { CurrenciesService } from "./currencies.service";
import { CreateCurrencyDto } from "./dto/create-currency.dto";
import { UpdateCurrencyDto } from "./dto/update-currency.dto";

import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../common/decorators/roles.decorator";

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("currencies")
export class CurrenciesController {
    constructor(private readonly currenciesService: CurrenciesService) {}

    @Roles("admin")
    @Post()
    create(@Body() createDto: CreateCurrencyDto) {
        return this.currenciesService.create(createDto);
    }

    @Get()
    findAll() {
        return this.currenciesService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.currenciesService.findOne(+id);
    }

    @Roles("admin")
    @Patch(":id")
    update(@Param("id") id: string, @Body() updateDto: UpdateCurrencyDto) {
        return this.currenciesService.update(+id, updateDto);
    }

    @Roles("admin")
    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.currenciesService.remove(+id);
    }
}
