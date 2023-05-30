import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { PermissionEnum } from '../enums/permission.enum';
import { PERMISSION_KEY } from '../decorators/permission.decorator';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector
  ) {}
  
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredPermissions = 
      this.reflector.getAllAndOverride<PermissionEnum[]>(PERMISSION_KEY,
        [
          context.getHandler(),
          context.getClass(),
        ]
      );

    if (!requiredPermissions) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    
    return requiredPermissions.every(
      el => user.permissions.indexOf(el) >= 0
    );
  }
}
