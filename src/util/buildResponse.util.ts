import { ResponseCommon } from '../dtos/response';

export class BuildResponseUtil {
  constructor() {}

  UnauthenticatedResponse(message: string): ResponseCommon {
    const resp = new ResponseCommon();
    resp.status = 'unauthenticated';
    resp.message = message;
    return resp;
  }

  InternalServerError(): ResponseCommon {
    const resp = new ResponseCommon();
    resp.status = 'failed';
    resp.message = 'internal server error';
    return resp;
  }
}
