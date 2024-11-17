import { IsEnum } from 'class-validator';
import { OrderStatusList } from '../enum/order.enum';
import { OrderStatus } from '@prisma/client';

export class OrderStatusDto {
  @IsEnum(OrderStatusList, {
    message: `status must be one of the following values: ${OrderStatusList}`,
  })
  status: OrderStatus;
}
