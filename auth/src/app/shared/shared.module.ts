import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
  ],
  providers: []
})
export class SharedModule { }
