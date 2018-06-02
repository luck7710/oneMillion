import {
  Component, ElementRef,
  OnInit,
  ViewChild, ViewContainerRef
} from '@angular/core';
import {TableComponent} from '../table/table.component';
import {GraphicComponent} from '../graphic/graphic.component';
import {HttpService} from '../service/http.service';
import {DynamicService} from '../service/dynamic.service';
import {GraphicAdvancedComponent} from '../graphic-advanced/graphic-advanced.component';
import {NgProgress} from 'ngx-progressbar';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  @ViewChild(TableComponent) tableComponent: TableComponent;
  @ViewChild(GraphicComponent) graphicComponent: GraphicComponent;
  isDisplay = false;
  isVisible = false;
  tableSelected: any;
  stateLoading: string;

  constructor(private httpService: HttpService, private elementRef: ElementRef, private dynamicService: DynamicService,
              private viewContainerRef: ViewContainerRef, private ngProgress: NgProgress) {
    console.log('Main instatiation');
  }

  displayProgressBar(stateLoading: number) {
    if (stateLoading >= 100) {
      this.isVisible  = false;
    }
    if (stateLoading === 0) {
      this.isVisible  = true;
    }
    this.stateLoading = stateLoading.toFixed(2);
  }

  switchDisplay() {
    this.isDisplay = !this.isDisplay;
  }

  updateTable(table) {
    this.tableComponent.tableDisplay(table);
  }
  deleteTable() {
    this.tableComponent.deleteSuccess();
  }

  getCharts() {
    this.httpService.getCharts().subscribe(
      data => {
        this.updateTable(data);
      }, (err) => {
        console.log(err);
      }
    );
  }

  updateChart(idChart: string, chartUpdate) {
    this.httpService.updateChart(idChart, chartUpdate).subscribe(
      data => {
        this.updateTable(data);
      }, (err) => {
        console.log(err);
      }
    );
  }
  deleteChart(idChart: string) {
    this.httpService.deleteChart(idChart).subscribe(
      data => {
        this.deleteTable();
      }, (err) => {
        console.log(err);
      }
    );
  }

  displayGraphic(table) {
    this.destroyGraphic();
    setTimeout(() => {
      this.graphicComponent.traceChartTest(table[0].chart);
    }, 0);

  }

  destroyGraphic() {
    console.log('destroy');
    this.graphicComponent.destroyChart();
  }

  someFuncAdd() {
    // const toto =  this.elementRef.nativeElement.querySelector('.hide');
    // toto.parentNode.removeChild(toto);
    console.log('add');
    this.dynamicService.setRootViewContainerRef(this.viewContainerRef);
    this.dynamicService.addDynamicComponent();
  }

  someFuncClear() {
    // const toto =  this.elementRef.nativeElement.querySelector('.hide');
    // toto.parentNode.removeChild(toto);
    console.log('clear');
    this.dynamicService.clearDynamicComponent();
  }

  someFuncRemove() {
    // const toto =  this.elementRef.nativeElement.querySelector('.hide');
    // toto.parentNode.removeChild(toto);
    console.log('remove');
    this.dynamicService.removeDynamicComponent();
  }

  displayChart() {
    this.isDisplay = !this.isDisplay;
  }

  ngOnInit() {
    console.log('Main init');
    this.getCharts();
  }

}
