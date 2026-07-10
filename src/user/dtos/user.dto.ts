import { Role } from '@/generated/prisma/enums';

export class UserDto {
  id: string;

  email: string;

  role: Role;
}
