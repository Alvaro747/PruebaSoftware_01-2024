import { Catch, ArgumentsHost, HttpStatus, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response, Request } from 'express';
import { errorMappings } from './mappers/prisma-exception.mapper';
import { ResponseType } from './types/response.type';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const responseObject: ResponseType = {
      success: false,
      statusCode: 500,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: '',
      result: null,
    };

    const errorCode = exception.code;
    const errorMapping = errorMappings[errorCode];

    if (!errorMapping) {
      responseObject.statusCode =
        exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
      return super.catch(exception, host);
    }

    const { status, message } = errorMapping;
    responseObject.statusCode = status;
    responseObject.message = `${message}, Error Code: ${errorCode}`;
    responseObject.path = request.originalUrl.split('/')[request.originalUrl.split('/').length - 1];

    return response.status(status).json(responseObject);
  }
}
