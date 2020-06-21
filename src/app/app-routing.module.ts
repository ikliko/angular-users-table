import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'user/create',
    loadChildren: () => import('./user/user-create/user-create.module').then(m => m.UserCreateModule)
  },
  {
    path: 'user/:id',
    loadChildren: () => import('./user/user-edit/user-edit.module').then(m => m.UserEditModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {
}
