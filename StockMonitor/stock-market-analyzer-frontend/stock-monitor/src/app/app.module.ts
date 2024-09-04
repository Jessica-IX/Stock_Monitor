import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgxsModule} from '@ngxs/store';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';

import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {StockDetailsComponent} from './components/stock-details/stock-details.component';
import {AuthState} from './states/auth.state';
import {StockState} from './states/stock.state';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {AuthService} from "./services/auth.service";
import {StockService} from "./services/stock.service";
import {MatCard, MatCardTitle} from "@angular/material/card";
import {HighchartsChartModule} from "highcharts-angular";
import {LogoutButtonComponent} from "./logout-button.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    StockDetailsComponent,
    LogoutButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxsModule.forRoot([AuthState, StockState]),
    NgxsLoggerPluginModule.forRoot(),
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatCard,
    MatCardTitle,
    HighchartsChartModule
  ],
  providers: [AuthService, StockService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
