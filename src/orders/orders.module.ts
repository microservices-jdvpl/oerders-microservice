import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from 'src/config';
import { PRODUCT_SERVICE } from 'src/config/constants';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [
    ClientsModule.register([
      {
        name: PRODUCT_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.PRODUCTS_MICROSERVICES_HOST,
          port: envs.PRODUCTS_MICROSERVICES_PORT,
        },
      },
    ]),
  ],
})
export class OrdersModule {}
