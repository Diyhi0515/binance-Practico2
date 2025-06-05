import { Test, TestingModule } from "@nestjs/testing";
import { CurrenciesService } from "./currencies.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Currency } from "./entities/currency.entity";

describe("CurrenciesService", () => {
    let service: CurrenciesService;

    beforeEach(async () => {
        const mockRepository = {
            find: jest.fn(),
            findOneBy: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CurrenciesService,
                {
                    provide: getRepositoryToken(Currency),
                    useValue: mockRepository,
                },
            ],
        }).compile();

        service = module.get<CurrenciesService>(CurrenciesService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
