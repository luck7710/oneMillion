import {Component, Input, OnInit, Output, ViewChild, EventEmitter} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {TableData} from '../TableData';
import {SelectionModel} from '@angular/cdk/collections';


const DEFAULT_COLUMNS = ['actions', 'platform', 'pair', 'startDate', 'endDate', 'numberCandles', 'isAllImported', 'importDate'];
const BACKTESTING_COLUMNS = ['dateLong', 'long', 'dateShort', 'short', '%Trade', '%Gain'];

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
  @Output() deleteChartSelected = new EventEmitter();
  displayedColumns = DEFAULT_COLUMNS;
  tableIsAvalaible = true;
  dataSource: MatTableDataSource<TableData>;
  selection = new SelectionModel<TableData>(true, []);
  chartToDelete = [];
  saveTableDAta: any;

  constructor() {
  }

  tableDisplay(tableData: any) {
    console.log(tableData);
    this.saveTableDAta = tableData;
    this.dataSource = new MatTableDataSource(tableData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.tableIsAvalaible = true;
  }

  deleteSuccess() {
    const chartFilter = this.dataSource.data.filter(obj => obj !== this.chartToDelete);
    this.tableDisplay(chartFilter);
    this.chartToDelete = [];
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  getColor(average: number) {
    if (average < 0) {
      return 'red';
    } else if (average > 0) {
      return 'green';
    } else {
      return;
    }
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

  updateChart(idChart: string) {
    alert('coming soon !');
  }

  deleteChart(row) {
    console.log(row._id);
    this.chartToDelete = row;
    this.deleteChartSelected.emit(row._id);
  }

  switchTable(typeTable: string, table?: any) {
    if (typeTable === 'backtestingTable') {
      this.displayedColumns = BACKTESTING_COLUMNS;
      this.tableDisplay(table);
    } else {
      this.displayedColumns = DEFAULT_COLUMNS;
      this.tableDisplay(this.saveTableDAta);
    }
  }

  ngOnInit() {
    console.log('Table init');
  }

}
