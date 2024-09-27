import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { ResponseType } from 'src/filters/types/response.type';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(map((res: unknown) => this.responseHandler(res, context)));
  }

  responseHandler(res: any, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const responseHttp = ctx.getResponse();

    const statusCode = responseHttp.statusCode;

    const response: ResponseType = {
      success: true,
      statusCode,
      message: 'Operation successfully',
      result: res,
    };

    return response;
  }
}
