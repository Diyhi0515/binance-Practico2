import { Test, TestingModule } from "@nestjs/testing";
import { CurrenciesController } from "./currencies.controller";
import { CurrenciesService } from "./currencies.service";

describe("CurrenciesController", () => {
    let controller: CurrenciesController;

    beforeEach(async () => {
        const mockCurrenciesService = {
            findAll: jest.fn().mockResolvedValue([]),
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [CurrenciesController],
            providers: [
                {
                    provide: CurrenciesService,
                    useValue: mockCurrenciesService,
                },
            ],
        }).compile();

        controller = module.get<CurrenciesController>(CurrenciesController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
