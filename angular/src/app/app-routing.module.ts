import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SendComponent } from './main-pages/send.component';
import { AboutComponent } from './main-pages/about.component';
import { ReadComponent } from './main-pages/read.component';
import { ReadMessageComponent } from './main-pages/read-message.component';

export const routes: Routes = [
  { path: '', redirectTo: 'send', pathMatch: 'full' },
  { path: 'send', component: SendComponent },
  { path: 'about', component: AboutComponent },
  { path: 'message/:messageId', component: ReadMessageComponent },
  { path: 'read', component: ReadComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
