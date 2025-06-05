import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "./dto/login.dto";
import * as bcrypt from "bcrypt";
import { CreateUserDto } from "../users/dto/create-user.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new UnauthorizedException("Credenciales inválidas");
        }

        return user;
    }

    async login(loginDto: LoginDto) {
        const user = await this.validateUser(loginDto.email, loginDto.password);

        const payload = {
            sub: user.id,
            username: user.email,
            role: user.role,
        };

        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
        };
    }

    async register(createUserDto: CreateUserDto) {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const user = await this.usersService.create({
            ...createUserDto,
            password: hashedPassword,
            role: "user",
        });

        const payload = {
            sub: user.id,
            username: user.email,
            role: user.role,
        };

        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
        };
    }
}
