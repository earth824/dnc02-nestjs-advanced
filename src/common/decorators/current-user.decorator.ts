import { AccessTokenPayload } from '@/auth/types/jwt-payload.type';
import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException
} from '@nestjs/common';
import { Request } from 'express';

export const CurrentUser = createParamDecorator(
  (data: keyof AccessTokenPayload, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const currentUser = request.user;
    if (!currentUser) {
      throw new InternalServerErrorException(
        'Current user must be authenticated'
      );
    }
    return data ? currentUser[data] : currentUser;
  }
);

// @CurrentUSer('sub') id: string ===> request.user.sub
// @CurrentUser() currentUser: AccessToekenPayload ===> request.user
