import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LOG_LOGGER_PROVIDERS } from 'angular2-logger/core';
import { Store, StoreModule } from '@ngrx/store';

import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './components/app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SendComponent } from './main-pages/send.component';
import { AboutComponent } from './main-pages/about.component';
import { ReadComponent } from './main-pages/read.component';
import { ReadMessageComponent } from './main-pages/read-message.component';

import { reducer } from './store';
import { ApiService } from './services/api.service';
import { PsstEffects } from './store/psst/psst.effects';

@NgModule({
  imports: [
    HttpModule,    
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StoreModule.provideStore(reducer),
    EffectsModule.run(PsstEffects),
    RouterStoreModule.connectRouter(),
    StoreDevtoolsModule.instrumentOnlyWithExtension()
  ],
  declarations: [
    AppComponent,
    NavBarComponent,
    SendComponent,
    AboutComponent,
    ReadComponent,
    ReadMessageComponent,
  ],
  bootstrap: [AppComponent],
  providers: [
    ApiService,
    LOG_LOGGER_PROVIDERS
  ]
})
export class AppModule { }
