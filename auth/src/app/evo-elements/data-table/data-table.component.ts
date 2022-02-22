import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, of } from 'rxjs';

import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';

export interface ITableColumn {
  [k: string]: any;
  key: string;
  title: string;
}

@Component({
  selector: 'evo-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent<T extends {[k: string]: any}> implements OnInit {

  @Input() list$: Observable<T[]> = of([]);

  @Input() cols: ITableColumn[] = [];

  @Output() startDelete: EventEmitter<T> = new EventEmitter();

  @Output() startSelect: EventEmitter<T> = new EventEmitter();

  faEdit = faEdit;

  trashIcon = faTrashAlt;

  constructor() { }

  ngOnInit(): void {
  }

  raiseDelete(row: T): void {
    this.startDelete.emit(row);
  }

  raiseSelect(row: T): void {
    this.startSelect.emit(row);
  }

}
