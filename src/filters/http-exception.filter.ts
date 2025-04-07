import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger('ExceptionsFilter');

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // Отримання детальної відповіді з винятку
    let responseBody: any = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse();

      // Перевірка, чи є відповідь об'єктом з додатковими даними
      if (typeof exceptionResponse === 'object') {
        responseBody = {
          ...responseBody,
          ...exceptionResponse,
        };
      } else {
        // Якщо відповідь - просто рядок
        responseBody.message = exceptionResponse;
      }
    } else {
      responseBody.message = 'Internal server error';
    }

    // Детальне логування помилки
    this.logger.error(
      `Status ${status} - ${request.method} ${request.url}`,
      exception.stack,
    );

    response.status(status).json(responseBody);
  }
}
