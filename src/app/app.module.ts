import { CommonModule, NgComponentOutlet } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent, AppShower, Button, Content } from './app.component';

@NgModule({
  imports: [BrowserModule, CommonModule],
  declarations: [AppComponent, AppShower, Content, Button],
  bootstrap: [AppComponent],
})
export class AppModule {}
