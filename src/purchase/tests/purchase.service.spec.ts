import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseService } from '../services/purchase.service';
import { PurchaseRepository } from '../repositories/purchase.repository';
import { Purchase, Product } from '../entities/purchase.entity';
import { NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

describe('PurchaseService', () => {
  let service: PurchaseService;
  let purchaseRepository: jest.Mocked<PurchaseRepository>;

  beforeEach(async () => {
    const purchaseRepositoryMock = {
      create: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PurchaseService,
        {
          provide: PurchaseRepository,
          useValue: purchaseRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<PurchaseService>(PurchaseService);
    purchaseRepository = module.get(PurchaseRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createPurchase', () => {
    it('should create a purchase', async () => {
      const id = uuidv4();
      const products = [new Product('product1', 'Burger', 100)];
      const mockPurchase = new Purchase(id, 'LOCAL', 'user1', 'No onions', 'Cash', products, 'NEW', 100, false);
      purchaseRepository.create.mockResolvedValue(mockPurchase);

      const result = await service.createPurchase({
        direction: 'LOCAL',
        idUser: 'user1',
        observations: 'No onions',
        payment: 'Cash',
        products: [
          {
            id: 'product1',
            name: 'Burger',
            price: 100,
          },
        ],
        total: 100,
      });

      expect(result).toEqual(mockPurchase);
      expect(purchaseRepository.create).toHaveBeenCalled();
    });
  });

  describe('getPurchaseById', () => {
    it('should return a purchase if found', async () => {
      const id = uuidv4();
      const products = [new Product('product1', 'Burger', 100)];
      const mockPurchase = new Purchase(id, 'LOCAL', 'user1', 'No onions', 'Cash', products, 'NEW', 100, false);
      purchaseRepository.findOne.mockResolvedValue(mockPurchase);

      const result = await service.getPurchaseById(id);
      expect(result).toEqual(mockPurchase);
      expect(purchaseRepository.findOne).toHaveBeenCalledWith(id);
    });

    it('should throw NotFoundException if purchase not found', async () => {
      purchaseRepository.findOne.mockResolvedValue(null);

      await expect(service.getPurchaseById('invalid-id')).rejects.toThrow(NotFoundException);
    });
  });

  describe('updatePurchase', () => {
    it('should update a purchase if found', async () => {
      const id = uuidv4();
      const updatedData = {
        direction: 'DELIVERY',
        idUser: 'user1',
        observations: 'No onions',
        payment: 'Credit Card',
        products: [
          {
            id: 'product2',
            name: 'Pizza',
            price: 200,
          },
        ],
        total: 200,
      };
      const existingProducts = [new Product('product1', 'Burger', 100)];
      const existingPurchase = new Purchase(id, 'LOCAL', 'user1', 'No onions', 'Cash', existingProducts, 'NEW', 100, false);
      const updatedProducts = [new Product('product2', 'Pizza', 200)];
      const updatedPurchase = new Purchase(id, 'DELIVERY', 'user1', 'No onions', 'Credit Card', updatedProducts, 'NEW', 200, false);
  
      purchaseRepository.findOne.mockResolvedValue(existingPurchase);
      purchaseRepository.update.mockResolvedValue(updatedPurchase);
  
      const result = await service.updatePurchase(id, updatedData);
      expect(result).toEqual(updatedPurchase);
      expect(purchaseRepository.update).toHaveBeenCalledWith(id, updatedPurchase);
    });
  
    it('should throw NotFoundException if purchase not found', async () => {
      purchaseRepository.findOne.mockResolvedValue(null);
  
      await expect(
        service.updatePurchase('invalid-id', {
          direction: 'DELIVERY',
          idUser: 'user1',
          observations: 'No onions',
          payment: 'Credit Card',
          products: [
            {
              id: 'product2',
              name: 'Pizza',
              price: 200,
            },
          ],
          total: 200,
        }),
      ).rejects.toThrow(NotFoundException);
    });
  });
  
  describe('deletePurchase', () => {
    it('should delete a purchase if found', async () => {
      const id = 'some-id';
      const existingProducts = [new Product('product1', 'Burger', 100)];
      const existingPurchase = new Purchase(id, 'LOCAL', 'user1', 'No onions', 'Cash', existingProducts, 'NEW', 100, false);
      
      purchaseRepository.findOne.mockResolvedValue(existingPurchase);
      purchaseRepository.delete.mockResolvedValue(true);
  
      await service.deletePurchase(id);
      expect(purchaseRepository.delete).toHaveBeenCalledWith(id);
    });
  
    it('should throw NotFoundException if purchase not found', async () => {
      purchaseRepository.findOne.mockResolvedValue(null);
  
      await expect(service.deletePurchase('invalid-id')).rejects.toThrow(NotFoundException);
    });
  });
  
});
