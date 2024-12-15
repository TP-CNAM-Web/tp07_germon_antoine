import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { NgxsModule } from '@ngxs/store';
import { CartState } from './cart/cart.state';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
      provideRouter(routes),
      provideHttpClient(),
      ApiService,
      importProvidersFrom(NgxsModule.forRoot([CartState]))
    ]
};