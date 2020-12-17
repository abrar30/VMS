import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Post,
  Body,
  Put,
  NotFoundException,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
import { VehicleService } from './vehicles.service';
import { CreateVehicleDto, UpdateVehicleDto } from './dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Controller('api/vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Get()
  public async getAllVehicle(
    @Res() res,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    const vehicle = await this.vehicleService.findAll(paginationQuery);
    return res.status(HttpStatus.OK).json(vehicle);
  }

  @Get('/:id')
  public async getVehicle(@Res() res, @Param('id') vehicleId: string) {
    const vehicle = await this.vehicleService.findOne(vehicleId);
    if (!vehicle) {
      throw new NotFoundException('Vehicle does not exist!');
    }
    return res.status(HttpStatus.OK).json(vehicle);
  }

  @Post()
  public async addVehicle(
    @Res() res,
    @Body() createVehicleDto: CreateVehicleDto,
  ) {
    try {
      const vehicle = await this.vehicleService.create(createVehicleDto);
      return res.status(HttpStatus.OK).json({
        message: 'Vehicle has been created successfully',
        vehicle,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Vehicle not created!',
        status: 400,
      });
    }
  }

  @Put('/:id')
  public async updateVehicle(
    @Res() res,
    @Param('id') vehicleId: string,
    @Body() updateVehicleDto: UpdateVehicleDto,
  ) {
    try {
      const vehicle = await this.vehicleService.update(
        vehicleId,
        updateVehicleDto,
      );
      if (!vehicle) {
        throw new NotFoundException('Vehicle does not exist!');
      }
      return res.status(HttpStatus.OK).json({
        message: 'Vehicle has been successfully updated',
        vehicle,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Vehicle not updated!',
        status: 400,
      });
    }
  }

  @Delete('/:id')
  public async deleteVehicle(@Res() res, @Param('id') vehicleId: string) {
    if (!vehicleId) {
      throw new NotFoundException('Vehicle ID does not exist');
    }

    const vehicle = await this.vehicleService.remove(vehicleId);

    if (!vehicle) {
      throw new NotFoundException('Vehicle does not exist');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Vehicle has been deleted',
      vehicle,
    });
  }
}
