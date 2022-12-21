import { EventEmitter } from 'node:events';

export const eventEmitter = new EventEmitter();

export enum SSEEvents {
  UseAdded = 'UseAdded',
}
