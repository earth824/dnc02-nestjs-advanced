import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import { Observable, of, tap } from 'rxjs';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  private data: { user: { data: unknown; expiresIn: number } } = {
    user: { data: null, expiresIn: 0 }
  };

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (this.data.user.data && this.data.user.expiresIn > Date.now()) {
      return of(this.data.user.data);
    }
    return next.handle().pipe(
      tap((data: unknown) => {
        this.data.user.data = data;
        this.data.user.expiresIn = Date.now() + 60000;
      })
    );
  }
}
