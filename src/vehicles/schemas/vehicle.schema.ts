import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Customer } from 'src/customers/schemas/customer.schema';
@Schema()
export class Vehicle extends Document {
  @Prop()
  name: string;

  @Prop()
  numberPlate: string;

  @Prop()
  type: string;

  @Prop()
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Customer' })
  customers: string;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
