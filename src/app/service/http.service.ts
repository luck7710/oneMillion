import { Injectable } from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class HttpService {

  constructor( private http: Http) { }
  getCharts() {
    return this.http.get('/chart/').map((res) => res.json());
  }
  getApplCharts() {
    return this.http.get('https://www.highcharts.com/samples/data/aapl-ohlc.json').map((res) => res.json());
  }
  getChartById(id) {
    this.http.get('/chart/' + id).subscribe(data => {
      console.log(JSON.parse(data['_body']));
      return JSON.parse(data['_body']);
      // this.tableDisplay(JSON.parse(data['_body']));
    });
  }
}
