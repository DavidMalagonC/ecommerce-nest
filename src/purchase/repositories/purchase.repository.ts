import { Injectable } from '@nestjs/common';
import { PurchaseModel } from '../models/purchase.model';
import { IPurchaseRepository } from '../interfaces/purchase-repository.interface';
import { Purchase } from '../entities/purchase.entity';

@Injectable()
export class PurchaseRepository implements IPurchaseRepository {
  private mapToPurchase(item: any): Purchase {
    return new Purchase(
      item.id,
      item.direction,
      item.idUser,
      item.observations,
      item.payment,
      item.products,
      item.status,
      item.total,
      item.validatePayment
    );
  }

  async findAll(): Promise<Purchase[]> {
    const result = await PurchaseModel.scan().exec();
    return result.map(item => this.mapToPurchase(item));
  }

  async findOne(id: string): Promise<Purchase> {
    const item = await PurchaseModel.get(id);
    if (!item) {
      return null;
    }
    return this.mapToPurchase(item);
  }

  async create(purchase: Purchase): Promise<Purchase> {
    const result = await PurchaseModel.create({
      id: purchase.id,
      direction: purchase.direction,
      idUser: purchase.idUser,
      observations: purchase.observations,
      payment: purchase.payment,
      products: purchase.products,
      status: purchase.status,
      total: purchase.total,
      validatePayment: purchase.validatePayment,
    });
    return this.mapToPurchase(result);
  }

  async update(id: string, updatedPurchase: Partial<Purchase>): Promise<Purchase> {
    const result = await PurchaseModel.update(
      { id },
      {
        direction: updatedPurchase.direction,
        idUser: updatedPurchase.idUser,
        observations: updatedPurchase.observations,
        payment: updatedPurchase.payment,
        products: updatedPurchase.products,
        status: updatedPurchase.status,
        total: updatedPurchase.total,
        validatePayment: updatedPurchase.validatePayment,
      }
    );
    return this.mapToPurchase(result);
  }

  async delete(id: string): Promise<boolean> {
    await PurchaseModel.delete(id);
    return true;
  }
}
