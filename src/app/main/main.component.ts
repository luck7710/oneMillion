import {Component, OnInit, ViewChild} from '@angular/core';
import {TableComponent} from '../table/table.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  @ViewChild(TableComponent) tableComponent: TableComponent;

  constructor() {
  }

  displayTable(table) {
    this.tableComponent.tableDisplay(table);
  }
  ngOnInit() {
    console.log('Main init');
  }

}
