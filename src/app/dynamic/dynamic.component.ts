import { Component, OnInit } from '@angular/core';
import {init} from 'protractor/built/launcher';
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
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.css']
})
export class DynamicComponent implements OnInit {
  options: Object;
  private chart: any;
  constructor() {
    console.log('Dynamic Component Instanciate');
    const aapl = [
      [1524177780000, 6709.1, 6709.1, 6708.9, 6708.9, 6709.0],
      [1524177840000, 6708.9, 6708.9, 6708.2, 6708.2, 6708.6],
      [1524177900000, 6708.2, 6708.9, 6708.2, 6708.9, 6708.9],
      [1524177960000, 6708.9, 6719.8, 6708.9, 6717.9, 6709.8],
      [1524178020000, 6717.9, 6717.9, 6717.9, 6717.9, 6717.9],
      [1524178080000, 6717.9, 6718.9, 6705.1, 6705.1, 6709.3],
      [1524178140000, 6707.6, 6711.1, 6704.3, 6704.3, 6706.5]
    ];
    this.traceChart(aapl);
  }


  public traceChart(table) {
    this.chart = Highcharts.stockChart('container', {

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
        data: table,
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

  destroyChart() {
    this.chart.destroy();
  }
  ngOnInit() {
  }
}

