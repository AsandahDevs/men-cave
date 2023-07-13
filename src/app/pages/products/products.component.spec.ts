import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ProductsDataService } from 'src/app/services/products-data.service';
import { of } from 'rxjs';
import { Product } from 'src/app/interfaces/product';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productService: ProductsDataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsComponent ],
      providers: [ ProductsDataService,HttpClient,HttpHandler]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsComponent)
    productService = TestBed.inject(ProductsDataService);;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve products on initialization', () => {
    const mockProducts:Product[] = [{id:1,title:'Gucci jacket',category:'mens clothing',description:'Limited edition Gucci jacket',price:399,image:'https:fakestoreapi/image/7'},{id:2,title:'sweatpants',category:'mens clothing',description:'jogging sweatpants for the gym enthusiasts',price:40.99,image:'https:fakestoreapi/image/9'}];
    spyOn(productService, 'getProducts').and.returnValue(of(mockProducts));

    component.ngOnInit();

    expect(productService.getProducts).toHaveBeenCalled();
  });

  it('should unsubscribe from the subscription on component destruction', () => {
    spyOn(component.menswear$, 'unsubscribe');

    component.ngOnDestroy();

    expect(component.menswear$.unsubscribe).toHaveBeenCalled();
  });
});
