import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SwitchModule, InputsModule } from '@progress/kendo-angular-inputs';


import { AppComponent } from './app.component';
import { ConfigComponent } from './config/config.component';
import { LightSwitchComponent } from './light-switch/light-switch.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LightColorComponent } from './light-color/light-color.component';


@NgModule({
  declarations: [
    AppComponent,
    ConfigComponent,
    LightSwitchComponent,
    LightColorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SwitchModule,
    InputsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
