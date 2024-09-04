export class FetchMonitoredStocks {
  static readonly type = '[Stock] Fetch Monitored Stocks';
  constructor(public userId: number) {}
}

export class FetchStockDetails {
  static readonly type = '[Stock] Fetch Stock Details';
  constructor(public symbol: string) {}
}

export class FetchStockHistory {
  static readonly type = '[Stock] Fetch Stock History';
  constructor(public symbol: string, public startDate: string, public endDate: string) {}
}

export class AddStock {
  static readonly type = '[Stock] Add Stock';
  constructor(public userId: number, public symbol: string) {}
}

export class RemoveStock {
  static readonly type = '[Stock] Remove Stock';
  constructor(public userId: number, public symbol: string) {}
}
