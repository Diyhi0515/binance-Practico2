import { Test, TestingModule } from "@nestjs/testing";
import { PaymentProofsService } from "./payment-proofs.service";

describe("PaymentProofsService", () => {
    let service: PaymentProofsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PaymentProofsService],
        }).compile();

        service = module.get<PaymentProofsService>(PaymentProofsService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
