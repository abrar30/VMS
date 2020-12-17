import { Document } from 'mongoose';
import { Vehicle } from '../../vehicles/schemas/vehicle.schema';

export interface ICustomer extends Document {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly phone: string;
  readonly address: string;
  readonly vehicles: Vehicle[];
}
