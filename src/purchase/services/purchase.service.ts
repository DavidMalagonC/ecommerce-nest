import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Purchase, Product } from '../entities/purchase.entity';
import { PurchaseRepository } from '../repositories/purchase.repository';
import { CreatePurchaseDto } from '../dtos/create-purchase.dto';
import { v4 as uuidv4 } from 'uuid';
import { IPurchaseRepository } from '../interfaces/purchase-repository.interface';

@Injectable()
export class PurchaseService {
  constructor(@Inject('IPurchaseRepository') private readonly purchaseRepository: IPurchaseRepository) {}

  async createPurchase(createPurchaseDto: CreatePurchaseDto): Promise<Purchase> {
    const products = createPurchaseDto.products.map(
      (product) => new Product(product.id, product.name, product.price)
    );

    const total = products.reduce((sum, product) => sum + product.price, 0);

    const productsPlainObjects = products.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
    }));

    const purchase = new Purchase(
      uuidv4(),
      createPurchaseDto.direction,
      createPurchaseDto.idUser,
      createPurchaseDto.observations || 'Ninguna',
      createPurchaseDto.payment,
      productsPlainObjects,
      'NEW',
      total,
      false
    );

    return await this.purchaseRepository.create(purchase);
  }

  async getAllPurchases(): Promise<Purchase[]> {
    return await this.purchaseRepository.findAll();
  }

  async getPurchaseById(id: string): Promise<Purchase> {
    const purchase = await this.purchaseRepository.findOne(id);
    if (!purchase) {
      throw new NotFoundException(`Purchase with id ${id} not found`);
    }
    return purchase;
  }

  async updatePurchase(id: string, createPurchaseDto: CreatePurchaseDto): Promise<Purchase> {
    const existingPurchase = await this.purchaseRepository.findOne(id);
    if (!existingPurchase) {
      throw new NotFoundException(`Purchase with id ${id} not found`);
    }
  
    const products = createPurchaseDto.products.map(
      (product) => new Product(product.id, product.name, product.price)
    );

    const productsPlainObjects = products.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
    }));

    const updatedPurchase = new Purchase(
      id,
      createPurchaseDto.direction,
      createPurchaseDto.idUser,
      createPurchaseDto.observations || 'Ninguna',
      createPurchaseDto.payment,
      productsPlainObjects,
      existingPurchase.status,
      createPurchaseDto.total,
      existingPurchase.validatePayment
    );
  
    return await this.purchaseRepository.update(id, updatedPurchase);
  }
  
  async deletePurchase(id: string): Promise<void> {
    const existingPurchase = await this.purchaseRepository.findOne(id);
    if (!existingPurchase) {
      throw new NotFoundException(`Purchase with id ${id} not found`);
    }
  
    await this.purchaseRepository.delete(id);
  }
}
