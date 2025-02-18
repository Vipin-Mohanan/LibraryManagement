/* eslint-disable prettier/prettier */
import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    InternalServerErrorException,
  } from '@nestjs/common';
  import { Request, Response } from 'express';
  
  @Catch() // This will catch all exceptions
  export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();
  
      let status = 500;
      let message:any = 'Internal Server Error';
  
      if (exception instanceof HttpException) {
        status = exception.getStatus();
        message = exception.getResponse();
      } else {
        exception = new InternalServerErrorException();
      }
  
      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: message,
      });
    }
  }
  