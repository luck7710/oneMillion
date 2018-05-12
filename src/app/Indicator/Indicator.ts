export abstract class Indicator {
  name: String;
  period: number;
  constructor(name: String, period: number) {
    this.name = name;
    this.period = period;
  }
  public getName() {
    return this.name;
  }
  public getPeriod() {
    return this.period;
  }
}

