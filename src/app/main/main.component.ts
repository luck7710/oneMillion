import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {TableComponent} from '../table/table.component';
import {GraphicComponent} from '../graphic/graphic.component';
import {HttpService} from '../service/http.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  @ViewChild(TableComponent) tableComponent: TableComponent;
  @ViewChild(GraphicComponent) graphicComponent: GraphicComponent;
  isDisplay = false;

  constructor(private httpService: HttpService) {
  }

  switchDisplay() {
    this.isDisplay = !this.isDisplay;
  }

  displayTable(table) {
    this.tableComponent.tableDisplay(table);
  }

  getTable() {
    this.httpService.getCharts().subscribe(
      data => {
        this.displayTable(data);
      }, (err) => {
        console.log(err);
      }
    );
  }
  displayGraphic(table) {
    console.log(table);
    const toto = new GraphicComponent();
    // this.graphicComponent.reload();
    // toto.traceChart(table[0].chart);
  }

  display() {
    this.isDisplay = !this.isDisplay;
  }

  ngOnInit() {
    console.log('Main init');
    this.getTable();
  }

}
