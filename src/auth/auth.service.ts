import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CustomersService } from 'src/customers/customers.service';
import { LoginCustomerDto } from 'src/customers/dto';
import { ICustomer } from 'src/customers/interfaces/customer.interface';
import { JwtPayload, LoginStatus } from './interface/login.status';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private readonly customerService: CustomersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginCustomerDto: LoginCustomerDto): Promise<LoginStatus> {
    // find customer in db
    const customer = await this.customerService.login(loginCustomerDto);

    // generate and sign token
    const token = this._createToken(customer);

    return {
      email: customer.email,
      ...token,
    };
  }

  async validateCustomer(payload: JwtPayload): Promise<ICustomer> {
    const customer = await this.customerService.findByPayload(payload);
    if (!customer) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return customer;
  }

  private _createToken({ email }: ICustomer): any {
    const expiresIn = process.env.EXPIRESIN;

    const customer: JwtPayload = { email };
    const accessToken = this.jwtService.sign(customer, {
      secret: process.env.SECRETKEY,
      expiresIn,
    });
    return {
      expiresIn,
      accessToken,
    };
  }
}

export const comparePasswords = async (customerPassword, currentPassword) => {
  return await bcrypt.compare(currentPassword, customerPassword);
};
