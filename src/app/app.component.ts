import {Component, ViewChild} from '@angular/core';
import {Http} from '@angular/http';
import {MatDialog} from '@angular/material';
import {DialogImportComponent} from './dialog-import/dialog-import.component';
import 'rxjs/add/operator/map';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Candle} from './Candle';
import {Table} from './Table';
import {TableData} from './TableData';

const DEFAULT_COLUMNS = ['number', 'platform', 'pair', 'startDate', 'endDate', 'numberCandles', 'isAllImported', 'importDate'];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  options: Object;
  endDate;
  startDate;
  platformSelected;
  pairSelected;
  chart = [];
  chartImport;
  requestIncr = 0;
  numberTradesTotal = 0;
  nextTimeStamp = 0;
  displayedColumns = DEFAULT_COLUMNS;
  // Candle Attributes
  min = 0;
  max = 0;
  open = 0;
  close = 0;
  moyenne = 0;
  timeStamp = 0;
  numberTrades = 0;
  dataSource: MatTableDataSource<TableData>;
  tableIsAvalaible = false;

  constructor(private dialog: MatDialog, private http: Http) {
    this.dataSource = null;
  }

  public traceChart(tabToTrace: any[]) {
    this.options = {
      title: {text: 'BTC Stock Price'},

      rangeSelector: {
        buttons: [{
          type: 'hour',
          count: 1,
          text: '1h'
        }, {
          type: 'day',
          count: 1,
          text: '1D'
        }, {
          type: 'all',
          count: 1,
          text: 'All'
        }],
        selected: 1,
        inputEnabled: false
      },

      series: [{
        name: 'BTC',
        type: 'candlestick',
        data: tabToTrace,
        tooltip: {
          valueDecimals: 4
        }
      },
        /*              {
                        type: 'flags',
                        name: 'Flags on series',
                        data: [{
                          x: lastDate,
                          title: 'On series'
                        }],
                        onSeries: 'dataseries',
                        shape: 'squarepin'
                      }, {
                        type: 'flags',
                        name: 'Flags on axis',
                        data: [{
                          x: 1524660960,
                          title: 'On axis'
                        }],
                        shape: 'squarepin'
                      }*/
      ]
    };
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
          this.traceChart(this.chart);
        });
    }
  }

  public fixMaxRequest(numberRequest: number): boolean {
    return (this.requestIncr < numberRequest);
  }

  public createCandle(): Candle {
    const candle = new Candle(this.open, this.close, this.min, this.max, this.timeStamp, this.numberTrades);
    // console.log(candle);
    return candle;
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

  saveChart(platformSelected: string, pairSelected: string, startDate: number, endDate: number, chart: number[], isAllImported: boolean) {
    const table = new Table(platformSelected, pairSelected, startDate, endDate, chart, isAllImported);
    // console.log(table);
    this.http.post('/chart', table)
      .subscribe(res => {
          // const resId = JSON.parse(res['_body'])._id;
          this.getCharts();
          // this.router.navigate(['/book-details', resId]);
        }, (err) => {
          console.log(err);
        }
      );
  }

  getCharts() {
    this.http.get('/chart/').subscribe(data => {
      console.log(JSON.parse(data['_body']));
            this.tableDisplay(JSON.parse(data['_body']));
    });
  }
  getChartById(id) {
    this.http.get('/chart/' + id).subscribe(data => {
      console.log(JSON.parse(data['_body']));
            this.tableDisplay(JSON.parse(data['_body']));
    });
  }

  tableDisplay(tableData) {
    this.dataSource = new MatTableDataSource(tableData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.tableIsAvalaible = true;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

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

}



