import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { PaymentProofsService } from "./payment-proofs.service";
import { CreatePaymentProofDto } from "./dto/create-payment-proof.dto";
import { UpdatePaymentProofDto } from "./dto/update-payment-proof.dto";

@Controller("payment-proofs")
export class PaymentProofsController {
    constructor(private readonly paymentProofsService: PaymentProofsService) {}

    @Post()
    create(@Body() createPaymentProofDto: CreatePaymentProofDto) {
        return this.paymentProofsService.create(createPaymentProofDto);
    }

    @Get()
    findAll() {
        return this.paymentProofsService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.paymentProofsService.findOne(+id);
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() updatePaymentProofDto: UpdatePaymentProofDto) {
        return this.paymentProofsService.update(+id, updatePaymentProofDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.paymentProofsService.remove(+id);
    }
}
