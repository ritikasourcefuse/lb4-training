// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';

import axios from 'axios';
import {get} from '@loopback/rest';
export class GatewayController {
  
  @get('/products')
  async getProducts() {
    const response = await axios.get('http://127.0.0.1:3000/products');
    
    return response.data;
  }

  @get('/products-with-orders')
  async getProductsWithOrders() {
    try {

      const productResponse = await axios.get('http://127.0.0.1:3001/products');
      const products = productResponse.data;

      const orderResponse = await axios.get('http://127.0.0.1:3002/orders');
      const orders = orderResponse.data;

      // Combine products and their related orders
      const productsWithOrders = products.map((product: any) => {
        const relatedOrders = orders.filter((order: any) => order.productId === product.id);
        return {
          ...product,
          orders: relatedOrders,
        };
      });

      return productsWithOrders;
    } catch (error) {
      console.error('Error fetching combined data:', error);
      throw new Error('Unable to fetch combined product and order data');
    }
  }
}
