import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserCreateComponent} from './user-create.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {UserCreateRoutingModule} from '@app/user/user-create/user-edit-routing.module';


@NgModule({
  declarations: [UserCreateComponent],
  imports: [
    CommonModule,
    UserCreateRoutingModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class UserCreateModule {
}
