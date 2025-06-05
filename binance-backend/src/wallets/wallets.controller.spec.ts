import { Test, TestingModule } from "@nestjs/testing";
import { WalletsController } from "./wallets.controller";
import { WalletsService } from "./wallets.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Wallet } from "./entities/wallet.entity";
import { User } from "../users/entities/user.entity";
import { Currency } from "../currencies/entities/currency.entity";

describe("WalletsController", () => {
    let controller: WalletsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [WalletsController],
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

        controller = module.get<WalletsController>(WalletsController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
