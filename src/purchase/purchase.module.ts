import { Module } from '@nestjs/common';
import { PurchaseService } from './services/purchase.service';
import { PurchaseRepository } from './repositories/purchase.repository';
import { PurchaseController } from './controllers/purchase.controller';

@Module({
  controllers: [PurchaseController],
  providers: [
    PurchaseService,
    {
      provide: 'IPurchaseRepository',
      useClass: PurchaseRepository,
    },
  ],
  exports: [PurchaseService],
})
export class PurchaseModule {}
