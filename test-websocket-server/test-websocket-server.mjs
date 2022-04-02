import * as fs from 'fs';

import { WebSocketServer } from 'ws';
import yargs from 'yargs';

const gameConfigs = {
  audica: {
    port: 8085,
    file: 'event-recordings/audica.txt'
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
      });
  },(argv) => {
    serve(argv.game, "", argv.delay);
  }).help().argv;
