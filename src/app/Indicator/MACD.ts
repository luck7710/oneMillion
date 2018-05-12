import {Indicator} from './Indicator';

export class MACD extends Indicator{

  constructor() {
    super('MACD',9);
  }
  public getName() {
    return this.name;
  }
}
