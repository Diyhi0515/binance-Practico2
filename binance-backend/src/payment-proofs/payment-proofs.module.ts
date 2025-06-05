import { Module } from "@nestjs/common";
import { PaymentProofsService } from "./payment-proofs.service";
import { PaymentProofsController } from "./payment-proofs.controller";

@Module({
    controllers: [PaymentProofsController],
    providers: [PaymentProofsService],
})
export class PaymentProofsModule {}
