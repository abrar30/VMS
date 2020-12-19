import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Vehicle } from '../../vehicles/schemas/vehicle.schema';
import * as mongoose from 'mongoose';
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

// CustomerSchema.pre('save', async next => {
//   const customer = this;
//   if (th('password')) {
//   }
//   next();
// });
