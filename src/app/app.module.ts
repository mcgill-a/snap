import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SnapComponent } from './snap/snap.component';
import { CardComponent } from './card/card.component';
import { CardsComponent } from './cards/cards.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: SnapComponent },
];

@NgModule({
  declarations: [AppComponent, SnapComponent, CardComponent, CardsComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
