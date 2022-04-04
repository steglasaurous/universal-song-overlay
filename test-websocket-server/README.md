A websocket test tool that does two things:

- Start a websocket server that emits recorded game data
- Record a real websocket server's messages for testing

# Usage

Run `npm install` to install the necessary packages.

## Run as test server - QuickStart

Run `node test-websocket-server.mjs audica` to start a websocket server emulating an
Audica websocket server.  Upon connection, the server will start emitting recorded
Audica websocket events.  

For more info, run `node test-websocket-server.mjs --help`.

