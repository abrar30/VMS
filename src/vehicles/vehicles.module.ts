import { Module } from '@nestjs/common';
import { VehicleController } from './vehicles.controller';
import { VehicleService } from './vehicles.service';
import { MongooseModule } from '@nestjs/mongoose';
import { VehicleSchema, Vehicle } from './schemas/vehicle.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Vehicle.name, schema: VehicleSchema }]),
  ],
  controllers: [VehicleController],
  providers: [VehicleService],
})
export class VehicleModule {}
