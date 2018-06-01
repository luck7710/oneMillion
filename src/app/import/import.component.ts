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
  @Output() displayProgressBar = new EventEmitter();

  chart = [];
  endDate;
  startDate;
  platformSelected;
  pairSelected;
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
  stateLoading = 0;

  constructor(private dialog: MatDialog, private httpService: HttpService, private http: Http) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogImportComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      if (result !== null && result !== undefined) {
        this.initChart();
        this.endDate = Math.round(result.endDate * 1000000);
        this.startDate = Math.round(result.startDate * 1000000);
        this.stateLoading = this.endDate - this.startDate;
        this.platformSelected = result.platformSelected;
        this.pairSelected = result.pairSelected;
        this.parseTradesToCandles(this.endDate, this.startDate, this.platformSelected, this.pairSelected);
      }
    });
  }

  parseTradesToCandles(endDate: number, startDate: number, platformSelected: String, pairSelected: string): void {
    if (platformSelected === 'Kraken') {
      this.httpService.getKraken('Trades', pairSelected, startDate).subscribe(result => {
          this.requestIncr++;
          console.log(this.requestIncr);
          if (result.last !== null && result.last !== undefined) {
            for (let i = 0; result[this.pairSelected].length > i; i++) {
              const trade = result[this.pairSelected][i][0];
              const volume = result[this.pairSelected][i][1];
              const timeStamp = result[this.pairSelected][i][2];
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
              }
              if (trade < this.min) {
                this.min = trade;
              }
              if (trade > this.max) {
                this.max = trade;
              }
            }
            if (result.last <= endDate && this.fixMaxRequest(10)) {
              console.log(result.last <= endDate);
              console.log(this.startDate, startDate, this.endDate);
              console.log(startDate - this.startDate, this.endDate - this.startDate);
              this.stateLoading = (startDate - this.startDate) / (this.endDate - this.startDate);
              this.displayProgressBar.emit(this.stateLoading * 100);
              setTimeout(() => this.parseTradesToCandles(endDate, result.last, platformSelected, pairSelected), 5000);
              // this.graphicComponent.traceChart(this.chart);
            } else {

              this.saveChart(this.platformSelected, this.pairSelected, this.startDate, this.endDate, this.chart, this.fixMaxRequest(10));
              return;
            }
          }
        }
      );
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

  public initChart(): void {
    this.chart = [];
    this.platformSelected = '';
    this.pairSelected = '';
    this.startDate = 0;
    this.endDate = 0;
    this.requestIncr = 0;
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
              this.initChart();
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
