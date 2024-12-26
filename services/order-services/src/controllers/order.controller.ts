// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';

import {inject} from '@loopback/core';
import {get, param} from '@loopback/rest';
import {OrderRepository} from '../repositories';
import {Order} from 'shared';
import {authorize} from '@loopback/authorization';

export class OrderController {
  constructor(
    @inject('repositories.OrderRepository')
    public orderRepository: OrderRepository,
  ) {}

  @authorize({
    allowedRoles: ['Subscriber', 'Admin', 'SuperAdmin'], // All roles can place orders
  })
  @get('/orders')
  async findOrders(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  @get('/orders/{id}')
  async findOrderById(@param.path.string('id') id: string): Promise<Order> {
    return this.orderRepository.findById(id);
  }

  @get('/orders/product/{productId}')
  async findOrdersByProduct(
    @param.path.string('productId') productId: string,
  ): Promise<Order[]> {
    return this.orderRepository.find({
      where: {productId},
    });
  }
}
