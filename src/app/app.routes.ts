import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ModelAndColorComponent } from './model-and-color/model-and-color.component';
import { ConfigAndOptionsComponent } from './config-and-options/config-and-options.component';
import { SummaryComponent } from './summary/summary.component';

export const routes: Routes = [
    { path: 'step1', component: ModelAndColorComponent },
    { path: 'step2', component: ConfigAndOptionsComponent },
    { path: 'step3', component: SummaryComponent },
];
