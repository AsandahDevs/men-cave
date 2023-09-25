import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';
import { LoginRoutingModule } from './login-routing.module';
import { ReactiveFormsModule} from '@angular/forms';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    MdbValidationModule,
    MdbTabsModule,
    MdbFormsModule,
    LoginRoutingModule
  ],
})
export class LoginModule { }
