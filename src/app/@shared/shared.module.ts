import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LoaderComponent} from './loader/loader.component';
import {TableComponent} from './components/table/table.component';

@NgModule({
  imports: [CommonModule],
  declarations: [LoaderComponent],
  exports: [LoaderComponent],
})
export class SharedModule {
}
