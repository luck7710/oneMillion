import {Component, ElementRef, OnInit} from '@angular/core';
import {init} from 'protractor/built/launcher';
import {setInterval} from 'timers';

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
  isDisplay = false;
  chartOptions: any;
  table: any;


  constructor() {
    console.log('Graphic Component Instanciate');
  }


  public traceChart(table: any) {
    this.table = table;
    console.log(table);
    this.isDisplay = true;
    this.chartOptions = {

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
        type: 'candlestick',
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
    };
    setTimeout(() => Highcharts.stockChart('container',
      this.chartOptions), 0);

  }

  public traceChartTest(table) {
    console.log(table);
    this.isDisplay = true;
    const adv_options = {
      title: {
        useHTML: true,
        x: -10,
        y: 8,
        text: '<span class="chart-title">SMA, EMA, ATR, RSI indicators <span class="chart-href"> <a href="http://www.blacklabel.pl/highcharts" target="_blank"> Black Label </a> </span> <span class="chart-subtitle">plugin by </span></span>'

      },
      indicators: [{
        id: 'AAPL',
        type: 'sma',
        params: {
          period: 14
        }
      },{
        id: 'AAPL',
        type: 'rsi',
        params: {
          period: 14,
          overbought: 70,
          oversold: 30
        },
        styles: {
          strokeWidth: 2,
          stroke: 'black',
          dashstyle: 'solid'
        },
        yAxis: {
          lineWidth: 2,
          title: {
            text: 'RSI'
          }
        }
      }],
      yAxis: {
        opposite: false,
        title: {
          text: 'DATA SMA EMA',
          x: -4
        },
        lineWidth: 2,
        labels: {
          x: 22
        }
      },
      rangeSelector: {
        selected: 0
      },
      tooltip: {
        enabledIndicators: true
      },
      series: [{
        type: 'candlestick',
        cropThreshold: 0,
        id: 'AAPL',
        name: 'AAPL',
        data: table,
        tooltip: {
          valueDecimals: 2
        }
      }]
    };

    setTimeout(() => Highcharts.stockChart('container', adv_options)
      , 0);
  }

  destroyChart() {
    this.isDisplay = false;
  }

  ngOnInit() {
  }

}
