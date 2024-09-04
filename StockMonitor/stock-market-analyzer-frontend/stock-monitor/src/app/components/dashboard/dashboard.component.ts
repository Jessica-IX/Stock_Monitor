import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FetchMonitoredStocks, AddStock, RemoveStock } from '../../actions/stock.actions';
import { StockState } from '../../states/stock.state';
import { Stock } from '../../models/stock.model';
import { AuthState } from '../../states/auth.state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @Select(StockState.getMonitoredStocks) monitoredStocks$!: Observable<Stock[]>;
  @Select(AuthState.getUserId) userId$!: Observable<number>;

  displayedColumns: string[] = ['symbol', 'name', 'currentPrice', 'priceChange', 'percentageChange', 'actions'];

  constructor(private store: Store, private router: Router) {}

  ngOnInit() {
    this.userId$.subscribe(userId => {
      this.store.dispatch(new FetchMonitoredStocks(userId));
    });
  }

  addStock(symbol: string) {
    this.userId$.subscribe(userId => {
      this.store.dispatch(new AddStock(userId, symbol));
    });
  }

  removeStock(symbol: string) {
    this.userId$.subscribe(userId => {
      this.store.dispatch(new RemoveStock(userId, symbol));
    });
  }

  viewDetails(symbol: string) {
    if (symbol) {
      this.router.navigate(['/stock-details', symbol]);
    } else {
      console.error('Stock symbol is undefined');
    }
  }
}
