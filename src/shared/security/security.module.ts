import { Module } from '@nestjs/common';
import { BcryptService } from './bcrypt.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EnvVariable } from '@/config/env.validation';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<EnvVariable, true>) => ({
        secret: configService.get('ACCESS_JWT_SECRET', { infer: true }),
        signOptions: {
          expiresIn: configService.get('ACCESS_JWT_EXPIRES_IN', { infer: true })
        }
      })
    })
  ],
  providers: [BcryptService],
  exports: [BcryptService, JwtModule]
})
export class SecurityModule {}
