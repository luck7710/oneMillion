import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {TableData} from '../TableData';

const DEFAULT_COLUMNS = ['platform', 'pair', 'startDate', 'endDate', 'numberCandles', 'isAllImported', 'importDate'];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() table;
  displayedColumns = DEFAULT_COLUMNS;
  dataSource: MatTableDataSource<TableData>;
  tableIsAvalaible = false;
  constructor() {
    console.log('Table init');
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

  ngOnInit() {
  }

}
