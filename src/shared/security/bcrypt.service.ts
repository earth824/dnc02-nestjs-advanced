import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  private readonly saltRound = 12;

  hash(plain: string): Promise<string> {
    return bcrypt.hash(plain, this.saltRound);
  }

  compare(plain: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plain, hashed);
  }
}
