import {Component, OnInit, ViewChild} from '@angular/core';
import {TableComponent} from '../table/table.component';
import {HttpService} from '../service/http.service';
import {RSI} from '../Indicator/RSI';
import {DialogStrategyComponent} from '../dialog-strategy/dialog-strategy.component';
import {MatDialog} from '@angular/material';


@Component({
  selector: 'app-backtesting',
  templateUrl: './backtesting.component.html',
  styleUrls: ['./backtesting.component.css']
})
export class BacktestingComponent implements OnInit {
  @ViewChild(TableComponent) tableComponent: TableComponent;
  RSI: RSI;
  table: any = [];

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
        console.log(this.RSI.averageGain, this.RSI.averageLoss, this.RSI.periodCount, this.RSI.previousCandle);
        if (i < 14) {
          console.log('warm up');
        } else {
          console.log(this.RSI.getRSI());
          if (this.RSI.getRSI() <= 30) {
            alert('survente');
          }
          if (this.RSI.getRSI() >= 70) {
            alert('surachat');
          }
        }
      }
    } else {
      console.log('in construction');
    }

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

  ngOnInit() {
    console.log('Backtesting init');
    this.getTable();
  }

}
