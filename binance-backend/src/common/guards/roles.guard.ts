import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../decorators/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);
        if (!requiredRoles) {
            return true;
        }

        const request = context.switchToHttp().getRequest<{ user?: { role?: string } }>();
        const user = request.user;
        const userRole: string = String(user?.role);
        if (!requiredRoles.includes(userRole)) {
            throw new ForbiddenException("No tienes permisos para acceder a esta ruta");
        }

        return true;
    }
}
