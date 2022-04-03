import * as fs from 'fs';

import {WebSocket, WebSocketServer} from 'ws';
import yargs from 'yargs';

const gameConfigs = {
  audica: {
    port: 8085,
    path: '/AudicaStats',
    file: 'event-recordings/audica.txt'
  },
  synth: {
    port: 9000,
    path: '/',
    file: 'event-recordings/synth.txt'
  }
};

const serve = (game, file = "", delay = false) => {
  if (delay) {
    console.log("delay set to true");
  }
  const wss = new WebSocketServer({ port: gameConfigs[game].port });
  const recordingData = fs.readFileSync(file ? file : gameConfigs[game].file).toString().split("\n");

  if (recordingData) {
    console.log('Read ' + recordingData.length + ' recorded events from file.');
  }
  console.log('Started websocket server.');

  function parseEventItem(eventItem) {
    return [
      parseInt(eventItem.substring(0,13)),
      eventItem.substring(14)
    ];
  }

  wss.on('connection', function connection(ws) {
    let timeoutHandler;

    function sendNextEvent(ws, eventIndex, delayMultiplier = 1) {
      if (recordingData[eventIndex]) {
        const eventItem = parseEventItem(recordingData[eventIndex]);

        console.log(JSON.stringify(eventItem));
        ws.send(eventItem[1]);
        console.log(eventIndex);
        if (recordingData[eventIndex+1]) {
          const nextEventItem = parseEventItem(recordingData[eventIndex+1]);

          console.log('Setting next event timeout to ' + ((nextEventItem[0] - eventItem[0]) * delayMultiplier));
          timeoutHandler = setTimeout(sendNextEvent, (nextEventItem[0] - eventItem[0]) * delayMultiplier, ws, eventIndex+1, delayMultiplier);
        } else {
          console.log('Event playback done.');
        }
      }
    }


    console.log('Got a connection - starting event playback');
    sendNextEvent(ws, 0, delay ? 2 : 1);

    ws.on('message', function incoming(message) {
      console.log('received: %s', message);
    });

    ws.on('close', () => {
      console.log('Closed connection, stopping event playback');
      clearTimeout(timeoutHandler);
    });
  });
}

const record = (game, websocket_host, file = "") => {
  const outputFile = file ? file : 'event-recordings/' + game + '-' + Date.now() + '.txt';
  const wsUrl = 'ws://' + (websocket_host ? websocket_host : 'localhost') + ':' + gameConfigs[game].port + gameConfigs[game].path;
  console.log(wsUrl);
  const ws = new WebSocket(wsUrl);
  ws.on('connection', () => {
    console.log('Connected.  Press Ctrl-C to end recording.');
  });

  ws.on('error', (error) => {
    console.log('Error connecting: ' + error.code + ' ' + error.toString());
  });
  ws.on('message', (message) => {
    fs.appendFileSync(outputFile, Date.now() + " " + message + "\n");
    console.log(message);
  });
};

const argv = yargs(process.argv.slice(2))
  .command('serve <game>', 'Serve game content', (yargs) => {
    yargs
      .positional('game', {
      describe: "Game to emulate.",
      type: 'string',
      choices: ['audica','synth','boombox','audiotrip','saber']
    })
      .option(
      'delay',{
        describe: "Slow down playback of game data",
        type: 'boolean'
      })
      .option(
        'file', {
          describe: "Use this event file instead of the default",
          type: 'string'
        }
      );
  },(argv) => {
    serve(argv.game, argv.file, argv.delay);
  })
  .command('record <game>', 'Record websocket events from a game', (yargs) => {
    yargs
      .positional('game', {
        describe: "Game to emulate.",
        type: 'string',
        choices: ['audica','synth','boombox','audiotrip','saber']
      })
      .option('host', {
        describe: 'Host to connect to.  Default is localhost',
        type: 'string'
      })
      .option('file', {
        describe: 'File name to write output to.',
        type: 'string'
      });
  }, (argv) => {
    record(argv.game, argv.host, argv.file);
  })
  .help().argv;
