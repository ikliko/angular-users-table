import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserCreateComponent} from '@app/user/user-create/user-create.component';


const routes: Routes = [
  {
    path: '',
    component: UserCreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class UserCreateRoutingModule {
}
