import {Indicator} from './Indicator';
import {Candle} from '../Candle';

export class RSI extends Indicator {
  periodCount = 0;
  period: number;
  // candle: Candle;
  previousCandle: Candle;
  averageGain: number;
  averageLoss: number;
  RS: number;
  rsi: number;

  constructor(period: number) {
    super('RSI', period);
    this.period = this.getPeriod();
  }

  public setAlgorythm(candle: Candle) {
    if (this.periodCount !== 0 && this.periodCount < this.period + 1) {
      if (candle.getClose() > this.previousCandle.getClose()) {
        this.averageGain = this.averageGain + (candle.getClose() - this.previousCandle.getClose());
      } else if (candle.getClose() < this.previousCandle.getClose()) {
        this.averageLoss = this.averageLoss + (this.previousCandle.getClose() - candle.getClose());
      } else {
      }
      this.RS = (this.averageGain / (this.period)) / (this.averageLoss / (this.period));
      this.rsi = 100 - (100 / (1 + this.RS));
    } else {
      if (this.periodCount === this.period + 1) {
        this.RS = this.averageLoss / this.averageLoss;
      } else {
        if (candle.getClose() > this.previousCandle.getClose()) {
          this.averageGain = this.averageGain * (this.period - 1) + (candle.getClose() - this.previousCandle.getClose());
          this.averageLoss = this.averageLoss * (this.period - 1);
        } else if (candle.getClose() < this.previousCandle.getClose()) {
          this.averageLoss = this.averageLoss * (this.period - 1) + (this.previousCandle.getClose() - candle.getClose());
          this.averageGain = this.averageGain * (this.period - 1);
        } else {
        }
        this.RS = (this.averageGain / (this.period)) / (this.averageLoss / (this.period));
        this.rsi = 100 - (100 / (1 + this.RS));
      }
    }
    this.periodCount++;
    this.previousCandle = candle;
  }

  public getRSI() {
    return this.rsi;
  }
}
