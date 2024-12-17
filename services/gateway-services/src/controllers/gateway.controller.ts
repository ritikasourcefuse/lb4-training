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
}
