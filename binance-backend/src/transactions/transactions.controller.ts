import { Controller, Post, Body, Param, Patch, UseGuards, ParseIntPipe, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { TransactionsService } from "./transactions.service";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { GetUserId } from "../common/decorators/get-user-id.decorator";

@Controller("transactions")
@UseGuards(JwtAuthGuard)
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) {}

    @Post()
    create(@Body() dto: CreateTransactionDto, @GetUserId() userId: number) {
        return this.transactionsService.create(dto, userId);
    }

    @Patch(":id/complete")
    complete(@Param("id", ParseIntPipe) id: number, @GetUserId() userId: number) {
        return this.transactionsService.complete(id, userId);
    }

    @Patch(":id/cancel")
    cancel(@Param("id", ParseIntPipe) id: number, @GetUserId() userId: number) {
        return this.transactionsService.cancel(id, userId);
    }

    @Patch(":id/proof")
    @UseInterceptors(FileInterceptor("file"))
    uploadProof(@Param("id", ParseIntPipe) id: number, @UploadedFile() file: Express.Multer.File, @GetUserId() userId: number) {
        return this.transactionsService.uploadProof(id, file.filename, userId);
    }

    @Post("mine")
    getUserTransactions(@GetUserId() userId: number) {
        return this.transactionsService.findUserTransactions(userId);
    }
}
