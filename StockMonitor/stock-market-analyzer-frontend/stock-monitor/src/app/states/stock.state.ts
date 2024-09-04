import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { StockService } from '../services/stock.service';
import { tap } from 'rxjs/operators';
import { Stock } from '../models/stock.model';
import { StockHistory } from '../models/stock-history.model';
import { FetchMonitoredStocks, FetchStockDetails, FetchStockHistory, AddStock, RemoveStock } from '../actions/stock.actions';

export interface StockStateModel {
  monitoredStocks: Stock[];
  selectedStock: Stock | null;
  stockHistory: StockHistory[];
}

@State<StockStateModel>({
  name: 'stock',
  defaults: {
    monitoredStocks: [],
    selectedStock: null,
    stockHistory: []
  }
})
@Injectable()
export class StockState {

  constructor(private stockService: StockService) {}

  @Selector()
  static getMonitoredStocks(state: StockStateModel) {
    return state.monitoredStocks;
  }

  @Selector()
  static getSelectedStock(state: StockStateModel) {
    return state.selectedStock;
  }

  @Selector()
  static getStockHistory(state: StockStateModel) {
    return state.stockHistory;
  }

  @Action(FetchMonitoredStocks)
  fetchMonitoredStocks(ctx: StateContext<StockStateModel>, action: FetchMonitoredStocks) {
    return this.stockService.getMonitoredStocks(action.userId).pipe(
      tap((stocks: Stock[]) => {
        ctx.patchState({ monitoredStocks: stocks });
      })
    );
  }

  @Action(FetchStockDetails)
  fetchStockDetails(ctx: StateContext<StockStateModel>, action: FetchStockDetails) {
    return this.stockService.getStockDetails(action.symbol).pipe(
      tap((stock: Stock) => {
        ctx.patchState({ selectedStock: stock });
      })
    );
  }

  @Action(FetchStockHistory)
  fetchStockHistory(ctx: StateContext<StockStateModel>, action: FetchStockHistory) {
    return this.stockService.getStockHistory(action.symbol, action.startDate, action.endDate).pipe(
      tap((history: StockHistory[]) => {
        ctx.patchState({ stockHistory: history });
      })
    );
  }

  @Action(AddStock)
  addStock(ctx: StateContext<StockStateModel>, action: AddStock) {
    return this.stockService.addStock(action.userId, action.symbol).pipe(
      tap(() => {
        ctx.dispatch(new FetchMonitoredStocks(action.userId));
      })
    );
  }

  @Action(RemoveStock)
  removeStock(ctx: StateContext<StockStateModel>, action: RemoveStock) {
    return this.stockService.removeStock(action.userId, action.symbol).pipe(
      tap(() => {
        ctx.dispatch(new FetchMonitoredStocks(action.userId));
      })
    );
  }
}
