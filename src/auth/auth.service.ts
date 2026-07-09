import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { UserService } from '@/user/user.service';
import { LoginDto } from './dtos/login.dto';
import { BcryptService } from '@/shared/security/bcrypt.service';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenPayload } from './types/jwt-payload.type';
import { AccessTokenService } from './access-token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
    private readonly accessTokenService: AccessTokenService
  ) {}

  async register(dto: RegisterDto): Promise<void> {
    await this.userService.createUser(dto);
  }

  async login(dto: LoginDto): Promise<{ access_token: string }> {
    const user = await this.userService.getUserByEmail(dto.email);
    if (!user) {
      // SENT ERROR RESPONSE (to be continue tomorrow)
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const isMatch = await this.bcryptService.compare(
      dto.password,
      user.password
    );
    if (!isMatch) {
      // SENT ERROR RESPONSE (to be continue tomorrow)
      throw new UnauthorizedException('Invalid email or password');
    }

    // const payload: AccessTokenPayload = {
    //   sub: user.id,
    //   email: user.email,
    //   role: user.role
    // };

    // const access_token = await this.jwtService.signAsync(payload);

    const access_token = await this.accessTokenService.sign({
      sub: user.id,
      email: user.email,
      role: user.role
    });

    return { access_token };
  }
}
