import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";

describe("UsersService", () => {
    let service: UsersService;

    beforeEach(async () => {
        const mockUserRepository = {
            // add mock methods if needed, e.g. find: jest.fn()
        };
        const module: TestingModule = await Test.createTestingModule({
            providers: [UsersService, { provide: "UserRepository", useValue: mockUserRepository }],
        }).compile();

        service = module.get<UsersService>(UsersService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
