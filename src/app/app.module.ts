import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SnapComponent } from './components/snap/snap.component';
import { CardComponent } from './components/card/card.component';
import { CardsComponent } from './components/cards/cards.component';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnnouncementsComponent } from './components/announcements/announcements.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: SnapComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    SnapComponent,
    CardComponent,
    CardsComponent,
    AnnouncementsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    InlineSVGModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
