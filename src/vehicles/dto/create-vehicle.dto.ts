import { MaxLength, IsNotEmpty, IsString, IsEmpty } from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  readonly numberPlate: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly type: string; // SUV , Jeep , car etc

  @IsString()
  @MaxLength(50)
  // @IsEmpty()
  readonly description?: string;

  @IsString()
  readonly customers: string;
}
