import { Test, TestingModule } from "@nestjs/testing";
import { TransactionsService } from "./transactions.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Transaction } from "./entities/transaction.entity";
import { Ad } from "../ads/entities/ad.entity";
import { User } from "../users/entities/user.entity";
import { Wallet } from "../wallets/entities/wallet.entity";

describe("TransactionsService", () => {
    let service: TransactionsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TransactionsService,
                {
                    provide: getRepositoryToken(Transaction),
                    useValue: {},
                },
                {
                    provide: getRepositoryToken(Ad),
                    useValue: {},
                },
                {
                    provide: getRepositoryToken(User),
                    useValue: {},
                },
                {
                    provide: getRepositoryToken(Wallet),
                    useValue: {},
                },
            ],
        }).compile();

        service = module.get<TransactionsService>(TransactionsService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
