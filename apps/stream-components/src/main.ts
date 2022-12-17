import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { trpcProvider } from './app/services/trpc.service';

bootstrapApplication(AppComponent, {
  providers: [trpcProvider],
}).catch((err) => console.error(err));
