import { Controller, Get, Res, Headers } from '@nestjs/common';
import { UserUseCase } from '../usecase/user';
import { Response } from 'express';
import { JsonWebTokenError, TokenExpiredError } from '@nestjs/jwt';
import { BuildResponseUtil } from '../util';

@Controller('api/user')
export class UserController {
  constructor(
    private userUseCase: UserUseCase,
    private buildResponse: BuildResponseUtil,
  ) {}

  @Get('me')
  async UserMe(
    @Headers('authorization') authorization: string,
    @Res() res: Response,
  ) {
    try {
      const bearerAuthArr = authorization?.split(' ') ?? [];
      const result = await this.userUseCase.userMe(bearerAuthArr[1]);

      res.status(200).send(result);
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        const resExpired =
          this.buildResponse.UnauthenticatedResponse('token expired');
        res.status(401).send(resExpired);
      } else if (e instanceof JsonWebTokenError) {
        const resInvalidBearer =
          this.buildResponse.UnauthenticatedResponse('bearer is invalid');
        res.status(401).send(resInvalidBearer);
      } else {
        console.log(e);

        const internalServerError = this.buildResponse.InternalServerError();
        res.status(500).send(internalServerError);
      }
    }

    return;
  }
}
