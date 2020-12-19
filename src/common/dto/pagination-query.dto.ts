import { IsOptional, IsPositive } from 'class-validator';
/**
 * Pagination Dto
 */
export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  limit?: number;

  @IsOptional()
  @IsPositive()
  offset?: number;
}
