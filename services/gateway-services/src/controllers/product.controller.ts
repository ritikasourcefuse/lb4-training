import {post, requestBody, getModelSchemaRef} from '@loopback/rest';
import {ProductRequest} from '../models/product-request.model';
import {intercept} from '@loopback/core';

@intercept('interceptors.LoggingInterceptor')
export class ProductController {
  @post('/products')
  async createProduct(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductRequest),
        },
      },
    })
    productData: ProductRequest,
  ): Promise<ProductRequest> {
    console.log('Validated Payload:', productData);
    return productData;
    // Forward the validated data to the product-service
    // Call product-service endpoint using REST or gRPC
  }
}
