import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef} from '@angular/core';
import {TableComponent} from '../table/table.component';
import {GraphicComponent} from '../graphic/graphic.component';
import {DynamicService} from '../service/dynamic.service';
import {HttpService} from '../service/http.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  @ViewChild(TableComponent) tableComponent: TableComponent;
  @ViewChild(GraphicComponent) graphicComponent: GraphicComponent;
  @Output() displayProgressBar = new EventEmitter();
  bodyStateView: string;
  isDisplay = false;



  constructor(private httpService: HttpService, private elementRef: ElementRef, private dynamicService: DynamicService,
              private viewContainerRef: ViewContainerRef) {
  }

  updateBodyView(bodyStateView: string) {
    console.log(bodyStateView);
    if (bodyStateView === '' && bodyStateView === null && bodyStateView === undefined) {
      this.bodyStateView = '';
    } else if (bodyStateView === 'IMPORT') {
      this.bodyStateView = 'IMPORT';

    } else if (bodyStateView === 'LIVE') {
      this.bodyStateView = 'LIVE';

    } else if (bodyStateView === 'BACKTESTING') {
      this.bodyStateView = 'BACKTESTING';
      this.getCharts();
    } else if (bodyStateView === 'CONFIG') {
      this.bodyStateView = 'CONFIG';
    } else {
      this.bodyStateView = '';
    }
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

  destroyGraphic() {
    console.log('destroy');
    this.graphicComponent.destroyChart();
  }


  switchDisplay() {
    this.isDisplay = !this.isDisplay;
  }

  ngOnInit() {
  }

}
