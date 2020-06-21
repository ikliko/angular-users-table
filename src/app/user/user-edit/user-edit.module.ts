import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserEditComponent} from './user-edit.component';
import {UserEditRoutingModule} from '@app/user/user-edit/user-edit-routing.module';
import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

@NgModule({
  declarations: [UserEditComponent],
  imports: [
    CommonModule,
    UserEditRoutingModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class UserEditModule {
}
