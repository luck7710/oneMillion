export class Table {
  platform: String;
  pair: String;
  startDate: Number;
  endDate: Number;
  chart: number[];
  isAllImported: Boolean;
  constructor (platform: string, pair: string, startDate: number, endDate: number, chart: number[], isAllImported: boolean) {
    this.platform = platform;
    this.pair = pair;
    this.startDate = startDate;
    this.endDate = endDate;
    this.chart = chart;
    this.isAllImported = isAllImported;
  }
}
