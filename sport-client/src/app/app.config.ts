import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi} from "@angular/common/http";
import { importProvidersFrom} from "@angular/core";

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {JwtInterceptor} from "./service/jwt-interceptor.service";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(
      withInterceptorsFromDi(),
      withFetch()
    ),
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ]
};
