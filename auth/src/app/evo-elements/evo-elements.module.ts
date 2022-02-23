import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { DataTableComponent } from './data-table/data-table.component';
import { FilterPipe } from './pipe/filter.pipe';
import { FibonacciPipe } from './pipe/fibonacci.pipe';

@NgModule({
  declarations: [
    DataTableComponent,
    FilterPipe,
    FibonacciPipe,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
  ],
  exports: [
    DataTableComponent,
  ],
  schemas: [],
})
export class EvoElementsModule {}
