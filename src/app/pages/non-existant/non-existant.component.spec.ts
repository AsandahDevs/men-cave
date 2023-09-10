import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonExistantComponent } from './non-existant.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentsModule } from 'src/app/components/components.module';

describe('NonExistantComponent', () => {
  let component: NonExistantComponent;
  let fixture: ComponentFixture<NonExistantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonExistantComponent ],
      imports:[RouterTestingModule,ComponentsModule]
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
