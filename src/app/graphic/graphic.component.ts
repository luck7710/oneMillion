import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.css']
})
export class GraphicComponent implements OnInit {
  options: Object;

  constructor() { }

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
  ngOnInit() {
  }

}
