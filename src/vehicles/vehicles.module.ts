import { Module } from '@nestjs/common';
import { VehicleController } from './vehicles.controller';
import { VehicleService } from './vehicles.service';
import { MongooseModule } from '@nestjs/mongoose';
import { VehicleSchema, Vehicle } from './schemas/vehicle.schema';
import {
  Customer,
  CustomerSchema,
} from 'src/customers/schemas/customer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Vehicle.name, schema: VehicleSchema },
      { name: Customer.name, schema: CustomerSchema },
    ]),
  ],
  controllers: [VehicleController],
  providers: [VehicleService],
})
export class VehicleModule {}
