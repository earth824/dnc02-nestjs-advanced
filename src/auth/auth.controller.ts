import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { AuthGuard } from './guards/auth.guard';
import { Public } from '@/common/decorators/public.decorator';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { UserDto } from '@/user/dtos/user.dto';
import { CacheInterceptor } from '@/common/interceptors/cache.interceptor';

// @Public()
@UseGuards(AuthGuard) // Controller Level
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  async register(
    @Body() registerDto: RegisterDto
  ): Promise<{ message: string }> {
    await this.authService.register(registerDto);
    return { message: 'Registered successfully' };
  }

  @Public()
  @Post('login')
  login(@Body() loginDto: LoginDto): Promise<{ access_token: string }> {
    return this.authService.login(loginDto);
  }

  // @UseGuards(AuthGuard) // Method Level
  @UseInterceptors(CacheInterceptor)
  @Get('me')
  getMe(@CurrentUser('sub') id: string): Promise<UserDto> {
    console.log('GET ME');
    return this.authService.getAuthenticatedUser(id);
  } // return authenticated user data
}
