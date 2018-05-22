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
      this.graphicComponent.traceChart(table[0].chart);
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
