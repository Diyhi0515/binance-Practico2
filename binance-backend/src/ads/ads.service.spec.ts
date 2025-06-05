import { Test, TestingModule } from "@nestjs/testing";
import { AdsService } from "./ads.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Ad } from "./entities/ad.entity";
import { Currency } from "../currencies/entities/currency.entity";
import { User } from "../users/entities/user.entity";

describe("AdsService", () => {
    let service: AdsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AdsService,
                {
                    provide: getRepositoryToken(Ad),
                    useValue: {}, // Puedes agregar métodos mock si deseas
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

        service = module.get<AdsService>(AdsService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
