import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { routes } from './app.routes';
import { provideServerRendering } from '@angular/platform-server';
import { PrerenderFallback } from '@angular/ssr';
import { serverRoutes } from './app.routes.server';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideIonicAngular(),
    provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),
      provideServerRendering(),
      provideHttpClient(withFetch())
     
      ]
};
