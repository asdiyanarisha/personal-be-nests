import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModuleAsyncOptions } from "@nestjs/jwt";

export const jwtModuleAsync: JwtModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (config: ConfigService) => ({
    global: true,
    secret: config.get('jwt_key'),
    signOptions: { expiresIn: '60s' },
  }),
  inject: [ConfigService],
};
