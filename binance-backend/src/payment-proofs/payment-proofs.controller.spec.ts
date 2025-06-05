import { Test, TestingModule } from "@nestjs/testing";
import { PaymentProofsController } from "./payment-proofs.controller";
import { PaymentProofsService } from "./payment-proofs.service";

describe("PaymentProofsController", () => {
    let controller: PaymentProofsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PaymentProofsController],
            providers: [PaymentProofsService],
        }).compile();

        controller = module.get<PaymentProofsController>(PaymentProofsController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
