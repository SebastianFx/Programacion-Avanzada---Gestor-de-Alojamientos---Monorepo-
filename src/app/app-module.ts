import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { AtomicModule } from './atomic/atomic-module';
import { CoreModule } from './core/core-module';
import { SharedModule } from './shared/shared-module';
import { TranslateConfigModule } from './core/i18n/translate-config-module';
@NgModule({
  declarations: [App],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateConfigModule,
    AtomicModule,
    CoreModule,
    SharedModule,
  ],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
