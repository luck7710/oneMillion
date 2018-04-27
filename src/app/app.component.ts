import {Component} from '@angular/core';
import {Http} from '@angular/http';
import {MatDialog} from '@angular/material';
import {DialogImportComponent} from './dialog-import/dialog-import.component';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  options: Object;
  endDate;
  startDate;
  platformSelected;
  pairSelected;
  tabImport = [];
  requestIncr = 0;

  constructor(private dialog: MatDialog, private http: Http) {

    http.get('https://api.kraken.com/0/public/OHLC?pair=XXBTZUSD&since=0')
      .map(response => {
        const result = response.json();
        const tabChart = [];
        for (let i = 0; result.result.XXBTZUSD.length > i; i++) {
          result.result.XXBTZUSD[i][0] = result.result.XXBTZUSD[i][0] * 1000;
          tabChart[i] = result.result.XXBTZUSD[i].splice(0, 5).map(Number);
        }
        return tabChart;
      })
      .subscribe(result => {
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
              data: result,
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
      )
    ;

  }

  importChart(endDate: number, startDate: number, platformSelected: String, pairSelected: String): void {
    if (platformSelected === 'Kraken') {
      console.log('https://api.kraken.com/0/public/OHLC?pair=' + pairSelected + '&since=' + startDate);
      this.http.get('https://api.kraken.com/0/public/OHLC?pair=' + pairSelected + '&since=' + startDate)
        .map(response => {
          this.requestIncr++;
          console.log(this.requestIncr);
          const result = response.json();
          for (let i = 0; result.result.XXBTZUSD.length > i; i++) {
            result.result.XXBTZUSD[i][0] = result.result.XXBTZUSD[i][0] * 1000;
            this.tabImport.push(result.result.XXBTZUSD[i].splice(0, 5));
          }
          if (result.result.last !== null && result.result.last !== undefined) {
            if (result.result.last <= endDate && this.requestIncr < 5) {
              console.log(result.result.last, endDate, result.result.last <= endDate);
              this.importChart(endDate, result.result.last, platformSelected, pairSelected);
            } else {
              return;
            }
          } else {
            return;
          }
        })
        .subscribe(result => {
          console.log(this.tabImport);
        });
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogImportComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      if (result !== null && result !== undefined) {
        this.endDate = Math.round((result.endDate - 60000)  / 1000);
        this.startDate = Math.round(result.startDate / 1000);
        this.platformSelected = result.platformSelected;
        this.pairSelected = result.pairSelected;
        this.importChart(result.endDate, result.startDate, this.platformSelected, this.pairSelected);
      }
    });
  }

}


