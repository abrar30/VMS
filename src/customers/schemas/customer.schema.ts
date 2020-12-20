import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Vehicle } from '../../vehicles/schemas/vehicle.schema';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
@Schema()
export class Customer extends Document {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  phone: string;

  @Prop()
  address: string;

  @Prop()
  description: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' }] })
  vehicles: Vehicle[];
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);

CustomerSchema.pre<Customer>('save', async function(next) {
  // const customer = this;
  /// console.log(customer);
  if (this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
