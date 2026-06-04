import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';
import { configValidationSchema } from './config.validation';

const envFilePath = [
  path.resolve(process.cwd(), `.env.${process.env.NODE_ENV || 'development'}`),
  path.resolve(process.cwd(), '.env'),
];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
      validationSchema: configValidationSchema as any,
    }),
  ],
})
export class AppConfigModule {}
