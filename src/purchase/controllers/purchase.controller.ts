import { Controller, UseGuards, Post, Get, Param, Put, Delete, Body } from '@nestjs/common';
import { PurchaseService } from '../services/purchase.service';
import { CreatePurchaseDto } from '../dtos/create-purchase.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Purchase } from '../entities/purchase.entity';

@Controller('purchases')
@UseGuards(JwtAuthGuard)
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post()
  createPurchase(@Body() createPurchaseDto: CreatePurchaseDto) {
    return this.purchaseService.createPurchase(createPurchaseDto);
  }

  @Get()
  async getAllPurchases() {
    const purchases: Purchase[] = await this.purchaseService.getAllPurchases();
    return purchases.map((purchase) => purchase.toJSON());
  }

  @Get(':id')
  async getPurchaseById(@Param('id') id: string) {
    const purchase: Purchase = await this.purchaseService.getPurchaseById(id);
    return purchase.toJSON();
  }

  @Put(':id')
  updatePurchase(@Param('id') id: string, @Body() createPurchaseDto: CreatePurchaseDto) {
    return this.purchaseService.updatePurchase(id, createPurchaseDto);
  }

  @Delete(':id')
  deletePurchase(@Param('id') id: string) {
    return this.purchaseService.deletePurchase(id);
  }
}
