# Rhythm Game Universal Song Overlay

This system provides a browser overlay for OBS that works with a number of VR rhythm games, showing
information on the song being played, album art, song progress, score and player health (where supported).

Currently supported games:

* [Synth Riders](https://synthridersvr.com/)
* [Audica](https://audicagame.com/)

Games to be supported shortly:
 
* [Beat Saber](https://beatsaber.com/)
* [Boombox VR](https://www.boomboxvr.com/)
* [Audio Trip](http://www.kinemotik.com/audiotrip/)

# Usage

## For Single-PC Stream Setups

If you run your stream software (i.e. OBS) on the same computer as your game, you get the
easy setup!  Follow these steps.

1. In OBS, add a new browser source with the following URL:  

```
https://steglasaurous.github.io/universal-song-overlay/index.html
```

2. For each game you want to use with the overlay, make sure to check game-specific requirements below.

## For 2-PC Stream Setups

If you run your stream software (i.e. OBS) on a different machine than your game, there's a slightly
different setup you need to follow.  This is to address security issues that prevent the overlay from
connecting to non-secure websocket endpoints (i.e. the games) from a secure website. 

1. Goto this page and download the "universal-song-overlay.zip" file to your **streaming** computer.  
2. Unzip the file anywhere on your PC (e.g. Desktop, Documents, etc). 
3. In the unzipped folder, double-click the file called "start_webserver.bat". This will download and start
   a simple web server on your streaming PC.
4. In OBS, add a new browser source with the following URL, substituting the example IP address `10.0.0.29` with the IP address of your gaming PC:

```
http://localhost:8081?websocket_host=10.0.0.29
```

   **PLEASE NOTE** - Since this runs a webserver, you must make sure it's running each time you stream or the overlay won't function.  Simply
   double-click on the `start_webserver.bat` file to start it again.

5. For each game you want to use with the overlay, make sure to check game-specific requirements below.

# Game-specific Requirements

## Synth Riders

1. Install the [Synth Riders Websocket mod](https://github.com/KK964/SynthRiders-Websockets-Mod) - this is what publishes game data used by the overlay.

2. Configure Synth's Song Status as per step 1 of [these instructions](https://docs.google.com/document/d/13Ei4bYQRvvhUBIl4Uc5rwls-gvzsQ78bXoJQKQ_qaLo/edit#heading=h.xsyyveoj8zvr). You do not need to do step 2. Note that the important part is making sure that `{{CoverImage}}` is included in the file.  This is what produces the album art for the current song.


# Configuration Options

The following options can be passed to the browser overlay by adding a query string at the end of the URL.

## Options List

`websocket_host` - The IP address or host name of the websocket server(s).  Useful for 2-pc stream setups where
the websocket server(s) may be running on a different machine.  Default is localhost.

**CAVEAT** - As of this writing, alternate websocket hosts will NOT work when served from an HTTPS URL (like github.io) due to CORS restrictions.
The only workaround for this at the moment is to build and run the overlay on a web server running on your machine without HTTPS.

Examples:

```
# Connect to websocket server(s) on another machine (for 2-pc stream setups):
https://steglasaurous.github.io/universal-song-overlay/?websocket_host=10.0.0.29
```
