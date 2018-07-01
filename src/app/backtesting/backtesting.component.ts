import {Component, OnInit, ViewChild} from '@angular/core';
import {TableComponent} from '../table/table.component';
import {HttpService} from '../service/http.service';
import {RSI} from '../Indicator/RSI';
import {DialogStrategyComponent} from '../dialog-strategy/dialog-strategy.component';
import {MatDialog} from '@angular/material';
import {GraphicComponent} from '../graphic/graphic.component';


@Component({
  selector: 'app-backtesting',
  templateUrl: './backtesting.component.html',
  styleUrls: ['./backtesting.component.css']
})
export class BacktestingComponent implements OnInit {
  @ViewChild(TableComponent) tableComponent: TableComponent;
  @ViewChild(GraphicComponent) graphicComponent: GraphicComponent;
  RSI: RSI;
  table: any = [];
  isAlreadyLong = false;
  dataToSend = [];
  dateLong = 0;
  long = 0;
  gain = 0;
  trade = 0;


  constructor(private httpService: HttpService, private dialog: MatDialog) {
  }


  getTable() {
    this.httpService.getCharts().subscribe(
      data => {
        this.table = data;
      }, (err) => {
        console.log(err);
      }
    );
  }

  backtesting(indicator: string, table) {
    if (indicator === 'MACD') {
    } else if (indicator === 'RSI') {
      this.RSI = new RSI(14);
      for (let i = 0; i < table.length; i++) {
        this.RSI.setAlgorythm(table[i][4]);
        // console.log(this.RSI.averageGain, this.RSI.averageLoss, this.RSI.periodCount, this.RSI.previousCandle);
        if (i < 14) {
          // console.log('warm up');
        } else {
          // console.log(this.RSI.getRSI());
          if (this.RSI.getRSI() <= 30 && !this.isAlreadyLong) {
            this.long = table[i][4];
            this.dateLong = table[i][0];
            this.graphicComponent.DisplayFlag(true, table[i], this.RSI.getRSI().toFixed(3));
            this.isAlreadyLong = true;
          }
          if (this.RSI.getRSI() >= 70 && this.isAlreadyLong) {
            this.trade = ((table[i][4] - this.long) / table[i][4]) * 100;
            this.gain += this.trade;
            this.dataToSend.push({
              dateLong: this.timeConverter(this.dateLong),
              long: this.long,
              dateShort: this.timeConverter(table[i][0]),
              short: table[i][4],
              trade: this.trade.toFixed(3),
              gain: this.gain.toFixed(3)
            });
            this.graphicComponent.DisplayFlag(false, table[i], this.RSI.getRSI().toFixed(2));
            this.isAlreadyLong = false;
          }
        }
      }
      this.displayGraphic(table);
      console.log(this.dataToSend);
      this.tableComponent.switchTable('backtestingTable', this.dataToSend);
    } else {
      console.log('in construction');
    }

  }

  timeConverter(UNIX_timestamp: number): string {
    const a = new Date(UNIX_timestamp);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    const hour = a.getHours();
    const min = a.getMinutes();
    const sec = a.getSeconds();
    const time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogStrategyComponent, {
      width: '',
      data: {table: this.table}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== null && result !== undefined) {
        console.log(result);
        this.backtesting(result.indicatorSelected, result.tableSelected);
      }
    });
  }

  displayGraphic(table) {
    setTimeout(() => {
      this.graphicComponent.traceChartTest(table);
    }, 0);

  }

  destroyGraphic() {
    console.log('destroy');
    this.graphicComponent.destroyChart();
  }

  ngOnInit() {
    console.log('Backtesting init');
    this.getTable();
  }

}
