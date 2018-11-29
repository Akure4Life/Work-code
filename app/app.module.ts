import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MAT_DATE_LOCALE } from '@angular/material';
import {RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { ClaimsFormComponent } from './claims-form/claims-form.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { BrokerDashboardComponent } from './broker-dashboard/broker-dashboard.component';
import { BrokerViewComponent } from './broker-view/broker-view.component';
import { CarrierDashboardComponent } from './carrier-dashboard/carrier-dashboard.component';
import { ClaimantDashboardComponent } from './claimant-dashboard/claimant-dashboard.component';
import { CarrierViewComponent } from './carrier-view/carrier-view.component';
import { ClaimantViewComponent } from './claimant-view/claimant-view.component';

@NgModule({
  declarations: [
    AppComponent,
    ClaimsFormComponent,
    LandingPageComponent,
    BrokerDashboardComponent,
    BrokerViewComponent,
    CarrierDashboardComponent,
    ClaimantDashboardComponent,
    CarrierViewComponent,
    ClaimantViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', component: LandingPageComponent},
      {path: 'claims-form', component: ClaimsFormComponent},
      {path: 'broker-dashboard', component: BrokerDashboardComponent},
      {path: 'broker-view', component: BrokerViewComponent},
      {path: 'carrier-dashboard', component: CarrierDashboardComponent},
      {path: 'claimant-dashboard', component: ClaimantDashboardComponent},
      {path: 'carrier-view', component: CarrierViewComponent},
      {path: 'claimant-view', component: ClaimantViewComponent}
    ])
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
