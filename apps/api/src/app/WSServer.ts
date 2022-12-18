import * as ws from 'ws';
import { applyWSSHandler } from '@trpc/server/adapters/ws';
import { appRouter } from './Routers/AppRouter';
import * as http from 'http';

export const wsServer = (server: http.Server, createContext: any) => {
  const wss = new ws.Server({
    server,
  });

  const handler = applyWSSHandler({
    wss,
    router: appRouter,
    createContext,
  });

  wss.on('connection', (ws) => {
    console.log(`➕➕ Connection (${wss.clients.size})`);
    ws.once('close', () => {
      console.log(`➖➖ Connection (${wss.clients.size})`);
    });
  });

  process.on('SIGTERM', () => {
    handler.broadcastReconnectNotification();
    wss.close();
    console.log('SIGTERM');
  });
};
