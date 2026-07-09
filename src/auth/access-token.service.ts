import { Inject, Injectable } from '@nestjs/common';
import { AccessTokenPayload } from './types/jwt-payload.type';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Injectable()
export class AccessTokenService {
  constructor(
    private readonly jwtService: JwtService
    // @Inject('Auth') private readonly aService: AuthService
  ) {}

  sign(payload: AccessTokenPayload): Promise<string> {
    return this.jwtService.signAsync(payload);
  }

  verify(token: string): Promise<AccessTokenPayload> {
    return this.jwtService.verifyAsync(token);
  }
}
