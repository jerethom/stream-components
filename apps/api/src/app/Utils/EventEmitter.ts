import { EventEmitter } from 'node:events';

export const eventEmitter = new EventEmitter();

export enum Events {
  UseAdded = 'UseAdded',
  ChannelMessageAdded = 'ChannelMessageAdded',
}
