import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtPayload } from './interface/login.status';
import { ICustomer } from 'src/customers/interfaces/customer.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRETKEY,
    });
  }

  async validate(payload: JwtPayload): Promise<ICustomer> {
    const customer = await this.authService.validateCustomer(payload);
    if (!customer) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return customer;
  }
}
