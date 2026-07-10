import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import { Request } from 'express';
import { map, Observable } from 'rxjs';

// APPLY:
// 1. GLOBAL: 1. main.ts: useGlobalInterceptor, 2. AppModule: { provide: APP_INTERCEPTOR, useClass:  }
// 2. Class Controller: UseInterceptor
// 3. Controller Method (Route Handler) : UseInterceptor
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // THIS CODE RUN BEFORE PIPE
    const request = context.switchToHttp().getRequest<Request>();
    return next.handle().pipe(
      map((data: unknown) => ({
        success: true,
        data: data,
        timestamp: new Date(),
        path: request.url
      }))
    );
  }
}
