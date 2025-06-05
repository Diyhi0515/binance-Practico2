import { Test, TestingModule } from "@nestjs/testing";
import { WalletsService } from "./wallets.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Wallet } from "./entities/wallet.entity";
import { User } from "../users/entities/user.entity";
import { Currency } from "../currencies/entities/currency.entity";

describe("WalletsService", () => {
    let service: WalletsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                WalletsService,
                {
                    provide: getRepositoryToken(Wallet),
                    useValue: {},
                },
                {
                    provide: getRepositoryToken(User),
                    useValue: {},
                },
                {
                    provide: getRepositoryToken(Currency),
                    useValue: {},
                },
            ],
        }).compile();

        service = module.get<WalletsService>(WalletsService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
