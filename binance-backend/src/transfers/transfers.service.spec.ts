import { Test, TestingModule } from "@nestjs/testing";
import { TransfersService } from "./transfers.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Transfer } from "./entities/transfer.entity";
import { Wallet } from "../wallets/entities/wallet.entity";

describe("TransfersService", () => {
    let service: TransfersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
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

        service = module.get<TransfersService>(TransfersService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
