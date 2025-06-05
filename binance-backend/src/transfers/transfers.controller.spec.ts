import { Test, TestingModule } from "@nestjs/testing";
import { TransfersController } from "./transfers.controller";
import { TransfersService } from "./transfers.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Transfer } from "./entities/transfer.entity";
import { Wallet } from "../wallets/entities/wallet.entity";

describe("TransfersController", () => {
    let controller: TransfersController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TransfersController],
            providers: [
                TransfersService,
                {
                    provide: getRepositoryToken(Transfer),
                    useValue: {
                        create: jest.fn(),
                        save: jest.fn(),
                        find: jest.fn(),
                        findOne: jest.fn(),
                    },
                },
                {
                    provide: getRepositoryToken(Wallet),
                    useValue: {
                        findOneBy: jest.fn(),
                        save: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<TransfersController>(TransfersController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
