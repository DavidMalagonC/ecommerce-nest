import { IsNotEmpty, IsString, Length, IsArray, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateProductDto } from './create-product.dto';

export class CreatePurchaseDto {
  @IsString()
  @IsNotEmpty()
  @Length(5, 255)
  direction: string;

  @IsString()
  @IsNotEmpty()
  idUser: string;

  @IsString()
  observations: string;

  @IsString()
  @IsNotEmpty()
  payment: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductDto)
  products: CreateProductDto[];

  @IsNumber()
  total: number;
}
