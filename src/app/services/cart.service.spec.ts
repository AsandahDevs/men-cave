import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('restores and updates the cart in local storage', () => {
    const product = {
      id: 1,
      title: 'Product',
      price: 100,
      category: 'Accessories',
      description: 'Description',
      image: '/product.jpg',
    };

    service.addProduct(product);
    service.increaseQuantity(product);

    expect(JSON.parse(localStorage.getItem('men-cave-cart') ?? '[]')).toEqual([
      { ...product, quantity: 2 },
    ]);

    const restoredService = new CartService();
    expect(restoredService.getCartItems()).toEqual([{ ...product, quantity: 2 }]);
  });
});
