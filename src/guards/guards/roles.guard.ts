import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { ROLE_KEY } from "../decorators/role-auth.decorator";

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(
    private jwtService: JwtService,
    private reflector: Reflector
    ) { }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRole = this.reflector.getAllAndOverride<string>(ROLE_KEY, [
        context.getHandler(),
        context.getClass(),
      ])
      if (!requiredRole) return true;

      const req = context.switchToHttp().getRequest()
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        throw new HttpException('Пользователь не авторизован', HttpStatus.UNAUTHORIZED);
      }

      const userData = this.jwtService.verify(token, { secret: process.env.JWT_ACCESS_SECRET });
      req.user = userData;
      if (requiredRole != userData.role) throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN);
      return true;
    } catch (e) {
      throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN);
    }
  }

}