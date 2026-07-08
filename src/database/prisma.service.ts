import { PrismaClient } from '@/generated/prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const adapter = new PrismaPg({
      connectionString:
        'postgres://postgres:123456@localhost:5432/dnc02_nestjs_auth'
    });
    super({ adapter });
  }
}
