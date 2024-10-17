import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PurchaseModule } from './purchase/purchase.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PurchaseModule,
    AuthModule,
  ],
})
export class AppModule {}
