import { Document } from 'mongoose';

export interface IVehicle extends Document {
  readonly numberPlate: string;
  readonly name: string;
  readonly type: string; // SUV , Jeep , car etc
  readonly description?: string;
}
