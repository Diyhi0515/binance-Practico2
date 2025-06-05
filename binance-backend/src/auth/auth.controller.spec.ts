import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

describe("AuthController", () => {
    let controller: AuthController;
    let authService: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthService,
                    useValue: {
                        login: jest.fn().mockResolvedValue({
                            access_token: "fake-jwt-token",
                            user: {
                                id: 1,
                                email: "test@example.com",
                                name: "Test User",
                                role: "admin",
                            },
                        }),
                    },
                },
            ],
        }).compile();

        controller = module.get<AuthController>(AuthController);
        authService = module.get<AuthService>(AuthService);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });

    it("should return token and user on login", async () => {
        const dto = { email: "test@example.com", password: "123456" };
        const result = await controller.login(dto);

        // eslint-disable-next-line @typescript-eslint/unbound-method
        const loginMock = authService.login as jest.Mock;
        expect(loginMock).toHaveBeenCalledWith(dto);
        expect(result).toEqual({
            access_token: "fake-jwt-token",
            user: {
                id: 1,
                email: "test@example.com",
                name: "Test User",
                role: "admin",
            },
        });
    });
});
