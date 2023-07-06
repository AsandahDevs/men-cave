import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonExistantComponent } from './non-existant.component';

describe('NonExistantComponent', () => {
  let component: NonExistantComponent;
  let fixture: ComponentFixture<NonExistantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonExistantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NonExistantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
