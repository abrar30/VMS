import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IVehicle } from './interfaces/vehicle.interface';
import { CreateVehicleDto, UpdateVehicleDto } from './dto';
import { Vehicle } from './schemas/vehicle.schema';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Injectable()
export class VehicleService {
  constructor(
    @InjectModel(Vehicle.name)
    private readonly vehiclenModel: Model<Vehicle>,
  ) {}

  public async findAll(
    paginationQuery: PaginationQueryDto,
  ): Promise<Vehicle[]> {
    const { limit, offset } = paginationQuery;
    return await this.vehiclenModel
      .find()
      .skip(offset)
      .limit(limit)
      .populate('customer')
      .exec();
  }

  public async findOne(vehicleId: string): Promise<Vehicle> {
    const vehicle = await this.vehiclenModel
      .findById({ _id: vehicleId })
      .populate('customer')
      .exec();

    if (!vehicle) {
      throw new NotFoundException(`vehicle #${vehicleId} not found`);
    }
    return vehicle;
  }

  public async create(createVehicleDto: CreateVehicleDto): Promise<IVehicle> {
    const vehicle = new this.vehiclenModel(createVehicleDto);
    return await vehicle.save();
  }

  public async update(
    vehicleId: string,
    updateVehicleDto: UpdateVehicleDto,
  ): Promise<IVehicle> {
    const existingVehicle = this.vehiclenModel.findByIdAndUpdate(
      { _id: vehicleId },
      updateVehicleDto,
      { new: true },
    );

    if (!existingVehicle) {
      throw new NotFoundException(`Customer #${vehicleId} not found`);
    }
    return existingVehicle;
  }

  public async remove(vehicleId: string): Promise<any> {
    const vehicle = this.vehiclenModel.findByIdAndRemove(vehicleId);
    return vehicle;
  }
}
