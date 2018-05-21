import {Component, Input, OnInit, Output, ViewChild,EventEmitter} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {TableData} from '../TableData';
import {SelectionModel} from '@angular/cdk/collections';


const DEFAULT_COLUMNS = [ 'platform', 'pair', 'startDate', 'endDate', 'numberCandles', 'isAllImported', 'importDate'];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() table;
  @Output() tableSelected = new EventEmitter();
  displayedColumns = DEFAULT_COLUMNS;
  tableIsAvalaible = false;
  dataSource: MatTableDataSource<TableData>;
  selection = new SelectionModel<TableData>(true, []);

  constructor() {
  }

  tableDisplay(tableData) {
    console.log(tableData);
    this.dataSource = new MatTableDataSource(tableData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.tableIsAvalaible = true;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  selectionRow(row: TableData) {
    console.log('ok');
    this.selection.clear();
    this.selection.toggle(row);
    this.tableSelected.emit(this.selection.selected);
  }

  getSelectionCamera(): TableData[] {
    return this.selection.selected;
  }

  ngOnInit() {
    console.log('Table init');
  }

}
