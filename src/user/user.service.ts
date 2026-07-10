import { ConflictException, Injectable } from '@nestjs/common';
import { UserCreateInput } from './types/user.type';
import { BcryptService } from '@/shared/security/bcrypt.service';
import { PrismaService } from '@/database/prisma.service';
import { User } from '@/generated/prisma/client';
import { PrismaClientKnownRequestError } from '@/generated/prisma/internal/prismaNamespace';

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
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Email already exists');
        }
      }
      throw error;
    }
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async getUserById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }
}
