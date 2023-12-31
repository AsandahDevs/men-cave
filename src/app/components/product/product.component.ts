import { Component, EventEmitter, Input,Output } from '@angular/core';
import { Product } from 'src/app/interfaces/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  
  @Input() product: Product = {} as Product;
  @Output() clickedProduct = new EventEmitter<Product>();

 addToCart(item: Product){
   this.clickedProduct.emit(item)
 }
}
