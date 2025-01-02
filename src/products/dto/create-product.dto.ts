import {
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

export class CreateProductDto {
  //! name
  @IsString()
  @Length(2, 24)
  name: string;

  //! description
  @IsString()
  @Length(10, 70)
  description: string;

  //! additional_info
  @IsString()
  @Length(20, 140)
  @IsOptional()
  additional_info?: string;

  //! price
  @IsPositive()
  @IsOptional()
  price?: number;

  //! stock
  @IsInt()
  @IsPositive()
  @IsOptional()
  stock?: number;
}
