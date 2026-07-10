import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '@/user/user.module';
import { SecurityModule } from '@/shared/security/security.module';
// import { JwtModule } from '@nestjs/jwt';
import { AccessTokenService } from './access-token.service';

@Module({
  imports: [
    UserModule,
    SecurityModule
    // JwtModule.register({
    //   secret: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    //   signOptions: { expiresIn: '1d' }
    // })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AccessTokenService
    // { provide: AuthService, useClass: AuthService }
    // { provide: 'Auth', useClass: AuthService }
  ],
  exports: [AccessTokenService]
})
export class AuthModule {}
