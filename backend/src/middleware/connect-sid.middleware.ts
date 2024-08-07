import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ConnectSidMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const connectSid = req.cookies['connect.sid'];
    req['connectSid'] = connectSid;
    next();
  }
}