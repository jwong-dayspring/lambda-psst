/// <reference path='custom.d.ts' />
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.module';
if (process.env.ENV === 'production') {
  enableProdMode();
}

window.TOUCH_INTERFACE = false;
window.HOVER_INTERFACE = false;

platformBrowserDynamic().bootstrapModule(AppModule);
