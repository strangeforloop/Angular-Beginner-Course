import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { RouterModule } from '@angular/router';
import { ProductModule } from './products/product.module';

@NgModule({
  // this allows the module to locate the selector
  // these are things i made
  declarations: [
    AppComponent,
    WelcomeComponent
  ],
  // these are for third party things
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', redirectTo: 'welcome',  pathMatch: 'full' },
    ]),
    ProductModule
  ],
  // lists the app component as the starting one
  bootstrap: [AppComponent]
})
export class AppModule { }
