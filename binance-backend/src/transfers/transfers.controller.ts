import { Controller, Post, Body, Get, Param, ParseIntPipe, UseGuards } from "@nestjs/common";
import { TransfersService } from "./transfers.service";
import { CreateTransferDto } from "./dto/create-transfer.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller("transfers")
export class TransfersController {
    constructor(private readonly transfersService: TransfersService) {}

    @Post()
    create(@Body() dto: CreateTransferDto) {
        return this.transfersService.create(dto);
    }

    @Get()
    findAll() {
        return this.transfersService.findAll();
    }

    @Get(":id")
    findOne(@Param("id", ParseIntPipe) id: number) {
        return this.transfersService.findOne(id);
    }
}
