import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {SharedModule} from '@shared';
import {TableModule} from '@shared/components/table/table.module';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    TableModule,
    MatButtonModule
  ],
  declarations: [HomeComponent],
})
export class HomeModule {
}
