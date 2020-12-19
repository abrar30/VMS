import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ICustomer } from './interfaces/customer.interface';
import { CreateCustomerDto, LoginCustomerDto, UpdateCustomerDto } from './dto';
import { Customer } from './schemas/customer.schema';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Vehicle } from '../vehicles/schemas/vehicle.schema';
import { comparePasswords } from 'src/auth/auth.service';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) private readonly customerModel: Model<Customer>,
    @InjectModel(Vehicle.name) private readonly vehicleModel: Model<Vehicle>,
  ) {}

  public async findAll(
    paginationQuery: PaginationQueryDto,
  ): Promise<Customer[]> {
    const { limit, offset } = paginationQuery;

    let test = await this.customerModel
      .find()
      .skip(offset)
      .limit(limit)
      .populate('vehicles')
      .exec();

    return test;
  }

  public async findOne(email: string): Promise<Customer> {
    const customer = await this.customerModel
      .findOne({ email })
      .populate('vehicles')
      .exec();

    if (!customer) {
      throw new NotFoundException(`Customer #${email} not found`);
    }

    return customer;
  }

  public async create(
    createCustomerDto: CreateCustomerDto,
  ): Promise<ICustomer> {
    const newCustomer = new this.customerModel(createCustomerDto);
    return await newCustomer.save();
  }

  public async update(
    customerId: string,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<ICustomer> {
    const existingCustomer = this.customerModel.findByIdAndUpdate(
      { _id: customerId },
      updateCustomerDto,
    );

    if (!existingCustomer) {
      throw new NotFoundException(`Customer #${customerId} not found`);
    }

    return existingCustomer;
  }

  public async remove(customerId: string): Promise<any> {
    const deletedCustomer = this.customerModel.findByIdAndRemove(customerId);
    return deletedCustomer;
  }

  async login({ email, password }: LoginCustomerDto): Promise<ICustomer> {
    const customer = await this.customerModel
      .findOne({ where: { email } })
      .exec();

    if (!customer) {
      throw new HttpException('customer not found', HttpStatus.UNAUTHORIZED);
    }

    // compare passwords
    const areEqual = await comparePasswords(customer.password, password);

    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return customer;
  }

  async findByPayload({ email }: any): Promise<ICustomer> {
    return await this.findOne(email);
  }
}
