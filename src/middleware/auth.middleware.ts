import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { BuildResponseUtil } from '../util';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers['authorization'];
    if (authorization === undefined) {
      const buildResponseUtil = new BuildResponseUtil();

      const resInvalidBearer =
        buildResponseUtil.UnauthenticatedResponse('bearer is invalid');
      res.status(401).send(resInvalidBearer);
      return;
    }

    next();
  }
}
