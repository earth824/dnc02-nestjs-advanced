import { AccessTokenPayload } from '@/auth/types/jwt-payload.type';
import 'express';

declare module 'express' {
  interface Request {
    user?: AccessTokenPayload;
  }
}
