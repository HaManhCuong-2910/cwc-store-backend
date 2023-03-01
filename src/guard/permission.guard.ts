import {
  Injectable,
  CanActivate,
  ExecutionContext,
  mixin,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountService } from 'src/account/account.service';

export const PermissionGuard = (permission: string) => {
  @Injectable()
  class PermissionGuardMixin implements CanActivate {
    constructor(
      public jwtService: JwtService,
      public accountService: AccountService,
    ) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const user: any = this.jwtService.decode(
        request.headers.authorization.split(' ')[1],
      );
      const { roles }: any = await this.accountService.getAcc(user.id);
      if (roles.find((item: string) => item === permission)) {
        return true;
      }
      return false;
    }
  }

  const guard = mixin(PermissionGuardMixin);
  return guard;
};
