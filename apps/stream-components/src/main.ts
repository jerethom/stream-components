import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { trpcProvider } from './app/services/trpc.service';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { appRouting } from './app/app.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { DialogModule } from '@angular/cdk/dialog';

bootstrapApplication(AppComponent, {
  providers: [
    trpcProvider,
    importProvidersFrom(
      RouterModule.forRoot(appRouting),
      BrowserAnimationsModule,
      HttpClientModule,
      DialogModule,
    ),
  ],
}).catch((err) => console.error(err));
