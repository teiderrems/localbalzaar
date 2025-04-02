import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import {requestInterceptor} from './request.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([requestInterceptor]))
    , provideStore(),
    {
      provide:'API_BASE_URL',
      useValue:'http://localhost:3000/v1'
    }
  ]
};
