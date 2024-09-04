import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stock } from '../models/stock.model';
import { StockHistory } from '../models/stock-history.model';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getMonitoredStocks(userId: number): Observable<Stock[]> {
    return this.http.get<Stock[]>(`${this.baseUrl}/user/${userId}/monitored-stocks`);
  }

  addStock(userId: number, symbol: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/user/${userId}/add-stock` + '?symbol=' + symbol, {});
  }

  removeStock(userId: number, symbol: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/user/${userId}/remove-stock` + '?symbol=' + symbol, {});
  }

  getStockDetails(symbol: string): Observable<Stock> {
    return this.http.get<Stock>(`${this.baseUrl}/stocks/${symbol}`);
  }

  getStockHistory(symbol: string, startDate: string, endDate: string): Observable<StockHistory[]> {
    return this.http.get<StockHistory[]>(`${this.baseUrl}/stocks/${symbol}/history` + '?startDate=' + startDate + '&endDate=' + endDate);
  }
}
