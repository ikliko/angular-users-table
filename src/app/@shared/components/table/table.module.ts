import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableComponent} from '@shared/components/table/table.component';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [
    TableComponent
  ],
  imports: [
    CommonModule,
    MatSortModule,
    MatTableModule,
    DragDropModule,
    MatPaginatorModule
  ],
  exports: [
    TableComponent
  ]
})
export class TableModule { }
