import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TrackByService {
  id(index: number, input: { id: string | number }) {
    return input.id;
  }
}
