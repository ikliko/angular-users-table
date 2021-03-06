import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserEditComponent} from '@app/user/user-edit/user-edit.component';


const routes: Routes = [
  {
    path: '',
    component: UserEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class UserEditRoutingModule {
}
