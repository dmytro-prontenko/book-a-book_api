import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, ip } = req;
    const userAgent = req.get('user-agent') || '';

    // Логуємо запит при отриманні
    this.logger.log(`${method} ${originalUrl} - ${ip} - ${userAgent}`);

    // Зберігаємо початковий час запиту
    const startTime = Date.now();

    // Функція, яка виконається після закінчення запиту
    res.on('finish', () => {
      const { statusCode } = res;
      const responseTime = Date.now() - startTime;

      // Логуємо відповідь
      this.logger.log(
        `${method} ${originalUrl} - ${statusCode} - ${responseTime}ms`,
      );
    });

    next();
  }
}
