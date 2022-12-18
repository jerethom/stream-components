import * as ws from 'ws';
import { applyWSSHandler } from '@trpc/server/adapters/ws';
import { appRouter } from './AppRouter';
import { createContext } from './Context';
import * as http from 'http';

export const wsServer = (server: http.Server) => {
  const wss = new ws.Server({
    server,
  });

  const handler = applyWSSHandler({ wss, router: appRouter, createContext });

  wss.on('connection', (ws) => {
    console.log(`➕➕ Connection (${wss.clients.size})`);
    ws.once('close', () => {
      console.log(`➖➖ Connection (${wss.clients.size})`);
    });
  });

  process.on('SIGTERM', () => {
    console.log('SIGTERM');
    handler.broadcastReconnectNotification();
    wss.close();
  });

  process.on('beforeExit', () => {
    console.log('beforeExit');
    handler.broadcastReconnectNotification();
    wss.close();
  });
};
