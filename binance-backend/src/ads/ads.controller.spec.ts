import { Test, TestingModule } from "@nestjs/testing";
import { AdsController } from "./ads.controller";
import { AdsService } from "./ads.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Ad } from "./entities/ad.entity";
import { Currency } from "../currencies/entities/currency.entity";
import { User } from "../users/entities/user.entity";

describe("AdsController", () => {
    let controller: AdsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AdsController],
            providers: [
                AdsService,
                {
                    provide: getRepositoryToken(Ad),
                    useValue: {},
                },
                {
                    provide: getRepositoryToken(Currency),
                    useValue: {},
                },
                {
                    provide: getRepositoryToken(User),
                    useValue: {},
                },
            ],
        }).compile();

        controller = module.get<AdsController>(AdsController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
