import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import { ChartComponent } from './chart/chart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomPmInputComponent } from './custom-pm-input/custom-pm-input.component';

export function chartModule(): any {
  return echarts
}
@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    CustomPmInputComponent
  ],
  imports: [ 
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
    BrowserModule,
    DragDropModule,
    BrowserAnimationsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
