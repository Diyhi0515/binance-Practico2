import { Injectable } from "@nestjs/common";
import { CreatePaymentProofDto } from "./dto/create-payment-proof.dto";
import { UpdatePaymentProofDto } from "./dto/update-payment-proof.dto";

@Injectable()
export class PaymentProofsService {
    create(createPaymentProofDto: CreatePaymentProofDto) {
        return "This action adds a new paymentProof";
    }

    findAll() {
        return `This action returns all paymentProofs`;
    }

    findOne(id: number) {
        return `This action returns a #${id} paymentProof`;
    }

    update(id: number, updatePaymentProofDto: UpdatePaymentProofDto) {
        return `This action updates a #${id} paymentProof`;
    }

    remove(id: number) {
        return `This action removes a #${id} paymentProof`;
    }
}
