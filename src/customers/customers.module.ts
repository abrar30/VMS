import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerSchema, Customer } from './schemas/customer.schema';
import { Vehicle, VehicleSchema } from 'src/vehicles/schemas/vehicle.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
      { name: Vehicle.name, schema: VehicleSchema },
    ]),
  ],
  providers: [CustomersService],
  controllers: [CustomersController],
})
export class CustomersModule {}
