import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomersModule } from './customers/customers.module';
import { VehicleModule } from './vehicles/vehicles.module';
import { ConfigModule, ConfigService } from 'nestjs-config';
import * as path from 'path';
import { FirebaseStrategy } from './auth/firebase.strategy';
import { FirebaseAuthStrategy } from './auth';
import { FirebaseAdminCoreModule } from '@tfarras/nestjs-firebase-admin';
@Module({
  imports: [
    ConfigModule.load(
      path.resolve(__dirname, 'config', '**', '!(*.d).{ts,js}'),
    ),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb://127.0.0.1:27017/vms',
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
      }),
    }),
    /// firebase jwt-passwort
    FirebaseAdminCoreModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('firebase'),
      inject: [ConfigService],
    }),
    CustomersModule,
    VehicleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
