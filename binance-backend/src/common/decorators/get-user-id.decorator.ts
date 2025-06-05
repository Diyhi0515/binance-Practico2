import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";

interface AuthRequest extends Request {
    user?: {
        userId: number;
    };
}

export const GetUserId = createParamDecorator((_data: unknown, ctx: ExecutionContext): number | undefined => {
    const request = ctx.switchToHttp().getRequest<AuthRequest>();
    return request.user?.userId;
});
