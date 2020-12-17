import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

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

  @Prop({ type: Types.ObjectId, ref: 'Customer' })
  customers: string;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
