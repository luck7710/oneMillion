export class Asset {
  platform: String;
  pairs: any[];
  assets: any[];
  constructor (platform: string, pairs: any[], assets: any[]) {
    this.platform = platform;
    this.pairs = pairs;
    this.assets = assets;
  }
}
