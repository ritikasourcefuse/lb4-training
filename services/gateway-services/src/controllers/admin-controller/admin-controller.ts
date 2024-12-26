import {authenticate} from '@loopback/authentication';
import {get} from '@loopback/rest';
import {authorize} from '@loopback/authorization';

@authenticate('jwt')
export class AdminController {
  @authorize({
    allowedRoles: ['Admin', 'SuperAdmin'],
  })
  @get('/admin/users')
  async getUsers() {
    return [
      {id: 1, email: 'admin@example.com', role: 'Admin'},
      {id: 2, email: 'subscriber@example.com', role: 'Subscriber'},
    ];
  }

  @authorize({
    allowedRoles: ['Admin', 'SuperAdmin'],
  })
  @get('/admin/orders')
  async getOrders() {
    return [
      {id: 'o1', product: 'Product A', quantity: 2},
      {id: 'o2', product: 'Product B', quantity: 5},
    ];
  }
}
