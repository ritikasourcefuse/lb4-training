
// - Demonstrate a TS interface and class with optional/default params
export interface Product {
    id:string;
    title:string;
    price:number;
    stock?:number
}


export class ProductClass implements Product {
    id: string;
    title: string;
    price: number;
    stock?: number | undefined;
    
    constructor(
        id: string,
        title: string,
        price: number,
        stock?: number | undefined
        
    ){
        this.id = id;
        this.title = title;
        this.price = price;
        this.stock = stock;
    }

    displayProduct(): void {
        console.log(
          `Product: ${this.title}, Price: ${this.price}, Stock: ${this.stock}`
        );
      }
    }
    
    const productA = new ProductClass('1', 'Laptop', 1200);
    const productB = new ProductClass('2', 'Smartphone', 800, 20);
    
    productA.displayProduct();
    productB.displayProduct();
