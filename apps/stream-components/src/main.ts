import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { trpcProvider } from './app/services/trpc.service';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { appRouting } from './app/app.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
  providers: [
    trpcProvider,
    importProvidersFrom(
      RouterModule.forRoot(appRouting),
      BrowserAnimationsModule
    ),
  ],
}).catch((err) => console.error(err));
