import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerSchema, Customer } from './schemas/customer.schema';
import { Vehicle, VehicleSchema } from 'src/vehicles/schemas/vehicle.schema';
import * as bcrypt from 'bcrypt';
@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Customer.name,

        useFactory: () => {
          const schema = CustomerSchema;
          schema.pre<Customer>('save', async () => {
            const user: any = this;
            if (user.password) {
              user.password = await bcrypt.hash(user.password, 10);
            }
          });
          return schema;
        },
      },

      {
        name: Vehicle.name,
        useFactory: () => {
          const schema = CustomerSchema;
          // schema.pre('save', function() {
          //  });
          return schema;
        },
      },
    ]),
  ],
  providers: [CustomersService],
  controllers: [CustomersController],
})
export class CustomersModule {}
