import {Component, OnInit, Output, EventEmitter, ViewChild} from '@angular/core';
import {DialogImportComponent} from '../dialog-import/dialog-import.component';
import {GraphicComponent} from '../graphic/graphic.component';
import {MatDialog} from '@angular/material';
import {Http} from '@angular/http';
import {Candle} from '../Candle';
import {Table} from '../Table';
import {HttpService} from '../service/http.service';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {
  @ViewChild(GraphicComponent) graphicComponent: GraphicComponent;
  @Output() displayTable = new EventEmitter();

  chart = [];
  endDate;
  startDate;
  platformSelected;
  pairSelected;
  numberTradesTotal = 0;
  nextTimeStamp = 0;
  requestIncr = 0;
  // Candle attributes
  min = 0;
  max = 0;
  open = 0;
  close = 0;
  moyenne = 0;
  timeStamp = 0;
  numberTrades = 0;

  constructor(private dialog: MatDialog, private httpService: HttpService, private http: Http) { }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogImportComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      if (result !== null && result !== undefined) {
        this.endDate = Math.round(result.endDate * 1000000);
        this.startDate = Math.round(result.startDate * 1000000);
        this.platformSelected = result.platformSelected;
        this.pairSelected = result.pairSelected;
        this.parseTradesToCandles(this.endDate, this.startDate, this.platformSelected, this.pairSelected);
      }
    });
  }

  parseTradesToCandles(endDate: number, startDate: number, platformSelected: String, pairSelected: String): void {
    if (platformSelected === 'Kraken') {
      // console.log('https://api.kraken.com/0/public/Trades?pair=' + pairSelected + '&since=' + startDate);
      this.http.get('https://api.kraken.com/0/public/Trades?pair=' + pairSelected + '&since=' + startDate)
        .map(response => {
            this.requestIncr++;
            const result = response.json();
            if (result.result.last !== null && result.result.last !== undefined) {
              // console.log('________________requestINCR: ', this.requestIncr, ' resultlast: ', result.result.last);
              for (let i = 0; result.result.XXBTZUSD.length > i; i++) {
                this.numberTradesTotal++;
                // console.log(this.numberTradesTotal);
                const trade = result.result.XXBTZUSD[i][0];
                const volume = result.result.XXBTZUSD[i][1];
                const timeStamp = result.result.XXBTZUSD[i][2];

                if (timeStamp >= this.nextTimeStamp && i > 1) {
                  const candle = this.createCandle();
                  const candleParse = [
                    candle.getTimeStamp() * 1000,
                    candle.getOpen(),
                    candle.getMax(),
                    candle.getMin(),
                    candle.getClose()
                  ].map(Number);
                  this.chart.push(candleParse);
                  this.initCandle();
                }
                this.numberTrades++;
                this.timeStamp = timeStamp;
                this.close = trade;
                if (this.nextTimeStamp === 0) {
                  this.open = trade;
                  this.min = trade;
                  this.max = trade;
                  this.nextTimeStamp = timeStamp + 60;
                  // console.log('timeStampOpen: ', timeStamp, 'nexTimeStamp: ', this.nextTimeStamp);
                }
                if (trade < this.min) {
                  this.min = trade;
                }
                if (trade > this.max) {
                  this.max = trade;
                }
              }
              if (result.result.last <= endDate && this.fixMaxRequest(2)) {
                // console.log(result.result.last, endDate, result.result.last <= endDate);
                this.parseTradesToCandles(endDate, result.result.last, platformSelected, pairSelected);
              } else {
                this.saveChart(this.platformSelected, this.pairSelected, this.startDate, this.endDate, this.chart, this.fixMaxRequest(2));
                return;
              }
            } else {
              setTimeout(() => this.parseTradesToCandles(endDate, result.result.last, platformSelected, pairSelected), 2000);
            }
          }
        )
        .subscribe(result => {
          this.graphicComponent.traceChart(this.chart);
        });
    }
  }

  public initCandle(): void {
    this.min = 0;
    this.max = 0;
    this.open = 0;
    this.close = 0;
    this.moyenne = 0;
    this.timeStamp = 0;
    this.nextTimeStamp = 0;
    this.numberTrades = 0;
  }

  public createCandle(): Candle {
    const candle = new Candle(this.open, this.close, this.min, this.max, this.timeStamp, this.numberTrades);
    // console.log(candle);
    return candle;
  }
  public fixMaxRequest(numberRequest: number): boolean {
    return (this.requestIncr < numberRequest);
  }

  saveChart(platformSelected: string, pairSelected: string, startDate: number, endDate: number, chart: number[], isAllImported: boolean) {
    const table = new Table(platformSelected, pairSelected, startDate, endDate, chart, isAllImported);
    // console.log(table);
    this.http.post('/chart', table)
      .subscribe(res => {
          // const resId = JSON.parse(res['_body'])._id;
        this.httpService.getCharts().subscribe(
          data => {
            this.displayTable.emit(data);
          }, (err) => {
            console.log(err);
          }
        );
        }, (err) => {
          console.log(err);
        }
      );
  }
  ngOnInit() {
    console.log('Import init');
  }

}
