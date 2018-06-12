import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class HttpService {

  constructor(private http: Http) {
  }

  getCharts() {
    return this.http.get('/chart/').map((res) => res.json());
  }

  updateChart(id, data) {
    return this.http.put('/chart/' + id, data).map((res) => res.json);
  }

  deleteChart(id) {
    return this.http.delete('/chart/' + id);
  }

  getAssets() {
    return this.http.get('/asset/').map((res) => res.json());
  }
  getAssetsByPlatform(platform) {
    return this.http.get('/asset/' + platform).map((res) => res.json());
  }

  updateAsset(id, data) {
    return this.http.put('/asset/' + id, data).map((res) => res.json);
  }

  deleteAsset(id) {
    return this.http.delete('/asset/' + id);
  }
  saveAsset(asset) {
    return this.http.post('/asset', asset);
  }


  getKraken(method: string, pair?: string, since?: number) {
    if (pair !== null && pair !== undefined) {
      if (since !== null && since !== undefined) {
        return this.http.get('/kraken/' + method + '?pair=' + pair + '&since=' + since).map((res) => res.json());
      } else {
        return this.http.get('/kraken/' + method + '?pair=' + pair + '&since=0').map((res) => res.json());
      }
    } else {
      return this.http.get('/kraken/' + method).map((res) => res.json());
    }
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
