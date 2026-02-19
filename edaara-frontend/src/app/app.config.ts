import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes'; // Si tu n'as pas de routes, on peut l'alléger

export const appConfig: ApplicationConfig = {
  providers: [provideRouter([])] // On met une liste vide pour l'instant
};