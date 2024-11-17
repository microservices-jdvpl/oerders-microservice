import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaClient } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';
import { OrderPaginationDto } from './dto/order-pagination.dto';

@Injectable()
export class OrdersService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(OrdersService.name);
  async onModuleInit() {
    await this.$connect();
    this.logger.log('Connected to the database');
  }
  create(createOrderDto: CreateOrderDto) {
    return this.order.create({ data: createOrderDto });
  }

  async findAll(orderpagination: OrderPaginationDto) {
    const totalOrders = await this.order.count({
      where: {
        status: orderpagination.status,
      },
    });
    const currentPage = orderpagination.page;
    const perPage = orderpagination.limit;
    return {
      data: await this.order.findMany({
        where: {
          status: orderpagination.status,
        },
        skip: (currentPage - 1) * perPage,
        take: perPage,
      }),
      totalOrders,
      currentPage,
      lastPage: Math.ceil(totalOrders / perPage),
    };
  }

  async findOne(id: string) {
    const order = await this.order.findFirst({ where: { id } });
    if (!order) {
      throw new RpcException({
        message: `Order with ${id} not found`,
        status: HttpStatus.NOT_FOUND,
      });
    }
    return order;
  }

  changeStatus() {
    return `This action updates a order`;
  }
}
