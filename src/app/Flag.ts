export class Flag {
  type: string;
  data: { x: number; title: any; text: string }[];
  color: string;
  fillColor: string;
  onSeries: string;
  width: number;
  style: { color: string };
  states: { hover: { fillColor: string } };

  constructor(type?: string, table?: any, indicator?: number, incr?: number) {
    if (type === 'LONG') {
      this.type = 'flags';
      this.data = [{
        x: table[0],
        title: '' + incr,
        text: '[' + type + '] RSI:' + indicator + ' CLOSE: ' + table[4]
      }];
      this.color = 'green';
      this.fillColor = 'green';
      this.onSeries = 'AAPL';
      this.width = 16;
      this.style = {
        color: 'white'
      };
      this.states = {
        hover: {
          fillColor: 'black'
        }
      };
    } else if (type === 'SHORT') {
      this.type = 'flags';
      this.data = [{
        x: table[0],
        title: incr,
        text: '[' + type + '] RSI:' + indicator + ' CLOSE: ' + table[4]
      }];
      this.color = 'red';
      this.fillColor = 'red';
      this.onSeries = 'AAPL';
      this.width = 16;
      this.style = {
        color: 'white'
      };
      this.states = {
        hover: {
          fillColor: 'black'
        }
      };
    } else {
    }
  }

  setData(type: string, table: any, indicator: number, incr: number) {
    this.data.push({
      x: table[0],
      title: '' + incr,
      text: '[' + type + '] RSI:' + indicator + ' CLOSE: ' + table[4]
    });
  }
}

