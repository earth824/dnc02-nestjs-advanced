import { Injectable } from '@nestjs/common';
import { UserCreateInput } from './types/user.type';
import { BcryptService } from '@/shared/security/bcrypt.service';
import { PrismaService } from '@/database/prisma.service';
import { User } from '@/generated/prisma/client';

@Injectable()
export class UserService {
  constructor(
    private readonly bcryptService: BcryptService,
    private readonly prisma: PrismaService
  ) {}

  async createUser(input: UserCreateInput): Promise<void> {
    const hashed = await this.bcryptService.hash(input.password);
    try {
      await this.prisma.user.create({
        data: { email: input.email, password: hashed, role: input.role }
      });
    } catch (error) {
      // HANDLE DUPLICATE EMAIL
      console.log(error);
    }
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }
}
