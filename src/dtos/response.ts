import { IsString, IsNotEmpty } from 'class-validator';

export class ResponseCommon {
  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}
