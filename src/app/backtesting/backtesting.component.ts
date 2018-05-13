import {Component, OnInit, ViewChild} from '@angular/core';
import {TableComponent} from '../table/table.component';
import {HttpService} from '../service/http.service';
import {RSI} from '../Indicator/RSI';


@Component({
  selector: 'app-backtesting',
  templateUrl: './backtesting.component.html',
  styleUrls: ['./backtesting.component.css']
})
export class BacktestingComponent implements OnInit {
  @ViewChild(TableComponent) tableComponent: TableComponent;
  RSI: RSI;

  constructor(private httpService: HttpService) {
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

  backtesting(table) {
    console.log(table[0]);
    this.RSI = new RSI(14);
    for (let i = 0; i < 50; i++) {
      // console.log(table[0].chart[i][4]);
      this.RSI.setAlgorythm(table[0].chart[i][4]);
      console.log(this.RSI.averageGain, this.RSI.averageLoss, this.RSI.periodCount, this.RSI.previousCandle);
      if (i < 14) {
        console.log('warm up');
      } else {
        console.log(this.RSI.getRSI());
      }
    }
  }

  ngOnInit() {
    this.getTable();
    console.log('Backtesting init');

  }

}
