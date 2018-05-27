import {
  Component, ElementRef, Inject,
  OnInit,
  ViewChild, ViewContainerRef
} from '@angular/core';
import {TableComponent} from '../table/table.component';
import {GraphicComponent} from '../graphic/graphic.component';
import {HttpService} from '../service/http.service';
import {DynamicService} from '../service/dynamic.service';
import {GraphicAdvancedComponent} from '../graphic-advanced/graphic-advanced.component';

const Kraken = require('../../assets/kraken');
import setimmediates from 'setimmediate';


// const Kraken = require('kraken-api/kraken');
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  @ViewChild(TableComponent) tableComponent: TableComponent;
  @ViewChild(GraphicComponent) graphicComponent: GraphicComponent;
  isDisplay = false;
  public tableSelected: any;

  constructor(private httpService: HttpService, private elementRef: ElementRef, private dynamicService: DynamicService,
              private viewContainerRef: ViewContainerRef) {
    console.log('Main instatiation');
/*    httpService.getKraken('Trades', 'XXBTZUSD', 1527450750803617824).subscribe( (result) => console.log(result));
    httpService.getKraken('Trades', 'XXBTZUSD').subscribe( (result) => console.log(result));
    httpService.getKraken('Trades').subscribe( (result) => console.log(result));*/
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

  display() {
    this.isDisplay = !this.isDisplay;
  }

  ngOnInit() {
    console.log('Main init');
    this.getTable();
  }

}
