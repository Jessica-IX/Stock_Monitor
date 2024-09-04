import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FetchStockDetails, FetchStockHistory } from '../../actions/stock.actions';
import { StockState } from '../../states/stock.state';
import { Stock } from '../../models/stock.model';
import { StockHistory } from '../../models/stock-history.model';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.scss']
})
export class StockDetailsComponent implements OnInit {
  @Select(StockState.getSelectedStock) selectedStock$!: Observable<Stock | null>;
  @Select(StockState.getStockHistory) stockHistory$!: Observable<StockHistory[]>;

  highcharts = Highcharts;
  chartOptions: any;

  symbol!: string;

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.symbol = params.get('symbol')!;
      this.store.dispatch(new FetchStockDetails(this.symbol));
      this.store.dispatch(new FetchStockHistory(this.symbol, '2023-01-01', '2023-12-31'));
    });


    this.stockHistory$.subscribe(history => {
      this.chartOptions = {
        title: { text: `${this.symbol} Stock Price` },
        series: [{
          data: history.map(h => [new Date(h.date).getTime(), h.close])
        }],
        xAxis: {
          type: 'datetime',
          title: { text: 'Date' }
        },
        yAxis: {
          title: { text: 'Price' }
        },
        animation:true,
        // tooltip:
      };
    });
  }
}
