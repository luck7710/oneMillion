export class Candle {
  private min: number;
  private max: number;
  private open: number;
  private close: number;
  private timeStamp: number;
  private numberTrades: number;

  constructor(open: number, close: number, min: number, max: number, timeStamp: number, numberTrades: number) {
    this.open = open;
    this.close = close;
    this.min = min;
    this.max = max;
    this.timeStamp = timeStamp;
    this.numberTrades = numberTrades;
  }

  public getOpen(): number {
    return this.open;
  }
  public setOpen(open: number): void {
     this.open = open;
  }

  public getClose(): number {
    return this.close;
  }
  public setClose(close: number): void {
    this.close = close;
  }

  public getMin(): number {
    return this.min;
  }
  public setMin(min: number): void {
    this.min = min;
  }

  public getMax(): number {
    return this.max;
  }
  public setMax(max: number): void {
    this.max = max;
  }

  public getTimeStamp(): number {
    return this.timeStamp;
  }
  public setTimeStamp(timeStamp: number): void {
    this.timeStamp = timeStamp;
  }
  public getNumberTrades(): number {
    return this.numberTrades;
  }
  public setNumberTrades(numberTrades: number): void {
    this.numberTrades = numberTrades;
  }

}
