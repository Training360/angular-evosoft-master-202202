import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EvoElementsModule } from '../evo-elements/evo-elements.module';
import { DataTableComponent } from '../evo-elements/data-table/data-table.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    EvoElementsModule,
  ],
  exports: [
    DataTableComponent,
  ]
})
export class SharedModule { }
