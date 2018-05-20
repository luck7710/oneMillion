import {Component, OnInit} from '@angular/core';
import {HttpService} from '../service/http.service';
import {HighchartsService} from 'angular2-highcharts/dist/HighchartsService';

require('../../assets/stocks/indicators/indicators')(Highcharts);
require('../../assets/stocks/indicators/ema')(Highcharts);
require('../../assets/stocks/indicators/macd')(Highcharts);
require('../../assets/stocks/indicators/rsi')(Highcharts);
require('../../assets/stocks/indicators/atr')(Highcharts);
require('../../assets/stocks/indicators/accumulation-distribution')(Highcharts);
require('../../assets/stocks/indicators/bollinger-bands')(Highcharts);
require('../../assets/stocks/indicators/cci')(Highcharts);
require('../../assets/stocks/indicators/cmf')(Highcharts);
require('../../assets/stocks/indicators/ichimoku-kinko-hyo')(Highcharts);
require('../../assets/stocks/indicators/mfi')(Highcharts);
require('../../assets/stocks/indicators/momentum')(Highcharts);
require('../../assets/stocks/indicators/pivot-points')(Highcharts);
require('../../assets/stocks/indicators/price-envelopes')(Highcharts);
require('../../assets/stocks/indicators/roc')(Highcharts);
require('../../assets/stocks/indicators/stochastic')(Highcharts);
require('../../assets/stocks/indicators/volume-by-price')(Highcharts);
require('../../assets/stocks/indicators/vwap')(Highcharts);
require('../../assets/stocks/indicators/wma')(Highcharts);
require('../../assets/stocks/indicators/zigzag')(Highcharts);
require('../../assets/stocks/graphic/annotations')(Highcharts);
require('../../assets/stocks/graphic/data')(Highcharts);
require('../../assets/stocks/graphic/drag-panes')(Highcharts);

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.css']
})
export class GraphicComponent implements OnInit {
  options: Object;
  data: any;

  constructor(private httpService: HttpService) {
    this.httpService.getApplCharts().subscribe(data => {
      this.data = data;
      console.log(data);
      this.traceChart2();
    });
  }

  traceChart2() {
    Highcharts.stockChart('container', {

      rangeSelector: {
        selected: 2
      },

      yAxis: [{
        height: '75%',
        resize: {
          enabled: true
        },
        labels: {
          align: 'right',
          x: -3
        },
        title: {
          text: 'AAPL'
        }
      }, {
        top: '75%',
        height: '25%',
        labels: {
          align: 'right',
          x: -3
        },
        offset: 0,
        title: {
          text: 'RSI'
        }
      }],

      title: {
        text: 'AAPL Stock Price'
      },

      subtitle: {
        text: 'With MACD and Pivot Points technical indicators'
      },

      series: [{
        type: 'ohlc',
        id: 'aapl',
        name: 'AAPL Stock Price',
        data: this.data,
        zIndex: 1
      }, {
        type: 'pivotpoints',
        linkedTo: 'aapl',
        zIndex: 0,
        lineWidth: 1,
        dataLabels: {
          overflow: 'none',
          crop: false,
          y: 4,
          style: {
            fontSize: 9
          }
        }
      }, {
        type: 'rsi',
        yAxis: 1,
        linkedTo: 'aapl'
      }]
    });
  }
  public traceChart() {
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
        data: this.data,
        // data: tabToTrace,
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

  ngOnInit() {
  }

}
