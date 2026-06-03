import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from './config.validation';

const envFilePath = [
  `.env.${process.env.NODE_ENV || 'development'}`,
  '.env',
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
