import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role, ROLES_KEY } from '../decorators/role.decorator';

export type Payload = {
  firstname: string | null;
  email: string;
  sub: number;
  roles: {
    role: {
      name: string;
    };
  }[];
};

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) =>
      (user as Payload).roles?.some((r: { role: { name: string } }) =>
        r.role.name.toLowerCase().includes(role.toLowerCase()),
      ),
    );
  }
}
