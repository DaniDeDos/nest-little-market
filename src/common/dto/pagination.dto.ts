import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  //! limit
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit?: number;

  //! offset
  @IsOptional()
  @Min(0)
  @IsPositive()
  @Type(() => Number)
  offset?: number;
}