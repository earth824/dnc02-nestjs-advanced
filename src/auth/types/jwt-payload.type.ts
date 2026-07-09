import { Role } from '@/generated/prisma/enums';

export type AccessTokenPayload = {
  sub: string;
  email: string;
  role: Role;
};
