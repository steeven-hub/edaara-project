import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app'; // Vérifie bien le chemin vers ton fichier app.ts

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));