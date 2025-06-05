import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

describe("AuthService", () => {
    let service: AuthService;

    beforeEach(async () => {
        const mockUser = {
            id: 1,
            email: "test@example.com",
            password: await bcrypt.hash("123456", 10),
            name: "Test User",
            role: "admin",
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: {
                        findByEmail: jest.fn().mockResolvedValue(mockUser),
                    },
                },
                {
                    provide: JwtService,
                    useValue: {
                        sign: jest.fn().mockReturnValue("fake-jwt-token"),
                    },
                },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    it("should return access_token and user on login", async () => {
        const result = await service.login({ email: "test@example.com", password: "123456" });
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
