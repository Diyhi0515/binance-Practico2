import { PartialType } from "@nestjs/mapped-types";
import { CreatePaymentProofDto } from "./create-payment-proof.dto";

export class UpdatePaymentProofDto extends PartialType(CreatePaymentProofDto) {}
