import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { Request } from 'express';
import { JsonWebTokenError, JwtService, TokenExpiredError } from '@nestjs/jwt';
import { AccessTokenPayload } from '../types/jwt-payload.type';
import { AccessTokenService } from '../access-token.service';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '@/common/decorators/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly accessTokenService: AccessTokenService,
    private readonly reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // READ METADATA
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(), // regisater() {} true: depend on endpoint
      context.getClass() // AuthController udefined: depend on endpoint
    ]);

    if (isPublic) {
      return true;
    }

    // NEST.JS Support Express.js(default) | Fastify
    // EXTRACT ACCESS TOKEN FROM BEARER AUTHORIZATION: Bearer xxxxxxxxxxxxxxxxxxxxxxx ==> ['Bearer', 'xxxxxxxxxxxxxxxxxxxxx']
    const request = context.switchToHttp().getRequest<Request>();
    const [bearer, token] = request.headers.authorization?.split(' ') ?? [];
    // CHECK ACCESS TOKEN EXIST OR MISS
    if (bearer !== 'Bearer' || !token) {
      throw new BadRequestException('Invalid authorization header');
    }
    // VERIFY ACCESS TOKEN
    try {
      // const payload =
      //   await this.jwtService.verifyAsync<AccessTokenPayload>(token);

      const payload = await this.accessTokenService.verify(token);
      request.user = payload;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('Token has been expired');
      }
      if (error instanceof JsonWebTokenError) {
        throw new UnauthorizedException('Token is invalid');
      }
      throw error;
    }

    return true;
  }
}
