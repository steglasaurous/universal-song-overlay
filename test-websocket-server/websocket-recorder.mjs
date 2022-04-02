import {WebSocket} from 'ws';
import * as fs from 'fs';

const outputFile = 'recording.txt';

const ws = new WebSocket('ws://localhost:8085/AudicaStats');
ws.on('error', (error) => {
  console.log('Error connecting: ' + error.code + ' ' + error.toString());
});
ws.on('message', (message) => {
  fs.appendFileSync(outputFile, Date.now() + " " + message + "\n");
  console.log(message);
});

