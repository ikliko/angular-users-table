import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {User} from '@shared/models/user.model';
import {TableConfig} from '@shared/states/user.state';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort, {static: true})
  public sort: MatSort;

  @ViewChild(MatPaginator, {static: true})
  public paginator: MatPaginator;

  @Input()
  public dataSource: MatTableDataSource<any>;

  @Output()
  public columnsOrderChange: EventEmitter<string[]> = new EventEmitter<string[]>();

  @Output()
  public sortChange: EventEmitter<User[]> = new EventEmitter<User[]>();

  @Output()
  public rowClick: EventEmitter<User> = new EventEmitter<User>();

  public columns: any;
  public displayedColumnIds: string[];
  public showTableConfiguration = false;
  public config: TableConfig;

  constructor() {
  }

  @Input('config')
  public set customConfig(value: TableConfig) {
    if (!value) {
      return;
    }

    this.config = {
      ...value
    }
  }

  @Input('columns')
  /**
   * Example:
   * {
   *    name: {
   *      title: 'Name', // field key of dataset
   *    }
   * }
   */
  public set customColumns(value: any) {
    if (!value) {
      return;
    }

    this.columns = value;
  }

  public ngOnInit(): void {
    this.setColumnsOrder();

    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  public ngOnDestroy(): void {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

  public drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.displayedColumnIds, event.previousIndex, event.currentIndex);

    this.columnsOrderChange.emit(this.displayedColumnIds);
  }

  public onMatSortChange(data: any) {
    this.sortChange.emit(data);


    setTimeout(() => {

      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  public rowClicked(data: any) {
    this.rowClick.emit(data);
  }

  private setColumnsOrder() {
    if (this.config && this.config.columnsOrder && this.config.columnsOrder.length) {
      this.displayedColumnIds = this.config.columnsOrder;

      return;
    }

    this.displayedColumnIds = Object.keys(this.columns);
  }
}
