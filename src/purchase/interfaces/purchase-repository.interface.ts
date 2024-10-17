import { Purchase } from "../entities/purchase.entity";

export interface IPurchaseRepository {
    findAll(): Promise<Purchase[]>;
    findOne(id: string): Promise<Purchase>;
    create(purchase: Purchase): Promise<Purchase>;
    update(id: string, updatedPurchase: Partial<Purchase>): Promise<Purchase>;
    delete(id: string): Promise<boolean>;
  }
  