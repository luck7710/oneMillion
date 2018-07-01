import {Indicator} from './Indicator';
import {Candle} from '../Candle';

export class RSI extends Indicator {
  periodCount = 0;
  period: number;
  // candle: Candle;
  previousCandle: number;
  averageGain = 0;
  averageLoss = 0;
  RS: number;
  rsi: number;

  constructor(period: number) {
    super('RSI', period);
    this.period = this.getPeriod();
  }

  public setAlgorythm(close: number) {
    if (this.periodCount !== 0 && this.periodCount < this.period + 1) {
      // console.log('input < 15');
      if (close > this.previousCandle) {
        // if (candle.getClose() > this.previousCandle.getClose()) {
        this.averageGain = this.averageGain + (close - this.previousCandle);
      } else if (close < this.previousCandle) {
        // } else if (candle.getClose() < this.previousCandle.getClose()) {
        this.averageLoss = this.averageLoss + (this.previousCandle - close);
        // this.averageLoss = this.averageLoss + (this.previousCandle.getClose() - candle.getClose());
      } else {
      }
      this.RS = (this.averageGain / (this.period)) / (this.averageLoss / (this.period));
      this.rsi = 100 - (100 / (1 + this.RS));
    } else if (this.periodCount !== 0 && this.periodCount >= this.period + 1) {
      // console.log('input > 15');
      if (close > this.previousCandle) {
        // if (candle.getClose() > this.previousCandle.getClose()) {
        this.averageGain = ((this.averageGain * (this.period - 1)) + (close - this.previousCandle)) / (this.period);
        this.averageLoss = (this.averageLoss * (this.period - 1)) / (this.period);
        // this.averageGain = this.averageGain * (this.period - 1) + (candle.getClose() - this.previousCandle.getClose());
      } else if (close < this.previousCandle) {
        // } else if (candle.getClose() < this.previousCandle.getClose()) {
        this.averageLoss = ((this.averageLoss * (this.period - 1)) + (this.previousCandle - close)) / (this.period);
        this.averageGain = (this.averageGain * (this.period - 1)) / (this.period);
        // this.averageLoss = this.averageLoss * (this.period - 1) + (this.previousCandle.getClose() - candle.getClose());
      } else {
        this.averageGain = (this.averageGain * (this.period - 1)) / (this.period);
        this.averageLoss = (this.averageLoss * (this.period - 1)) / (this.period);
      }
      this.RS = (this.averageGain) / (this.averageLoss);
      this.rsi = 100 - (100 / (1 + this.RS));

    } else {
    }
    this.periodCount++;
    this.previousCandle = close;
  }

  public getRSI() {
    return this.rsi;
  }
}
