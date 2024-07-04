import { NextApiRequest, NextApiResponse } from 'next';
import { Socket } from 'net';
import { Server as HttpServer } from 'http';
import WebSocket, { WebSocketServer as WSWebSocketServer } from 'ws';

type ExtendedNextApiResponse = NextApiResponse & {
  socket: Socket & {
    server: HttpServer & {
      wss?: any;
    };
  };
};

let wss: any;

const handler = async (req: NextApiRequest, res: ExtendedNextApiResponse) => {
  // if (!res.socket.server.wss) {
    console.log('Initializing WebSocket server...');

    const WebSocketServer = WebSocket.Server || WSWebSocketServer;
    wss = new WebSocketServer({ noServer: true });

    wss.on('connection', (ws: any) => {
      console.log('Client connected');

      ws.on('close', () => {
        console.log('Client disconnected');
      });

      ws.on('message', (message: any) => {
        console.log('Received message:', message);
        // Handle incoming messages from clients if needed
      });
    });

    wss.on('error', (error: any) => {
      console.error('WebSocket server error:', error);
    });

    res.socket.server.wss = wss;

    res.socket.server.on('upgrade', (request, socket, head) => {
      if (request.url === '/api/websocket') {
        wss.handleUpgrade(request, socket, head, (ws: any) => {
          wss.emit('connection', ws, request);
        });
      } else {
        // socket.destroy();
      }
    });
  // }
  res.status(200).end();
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;

export function broadcastNewRide(ride: any) {
  if (wss) {
    wss.clients.forEach((client: any) => {
      if (client.readyState === client.OPEN) {
        client.send(JSON.stringify(ride));
      }
    });
  }
}
