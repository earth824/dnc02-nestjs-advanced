import { Role } from '@/generated/prisma/enums';

export type UserCreateInput = {
  email: string;
  password: string;
  role?: Role;
};
