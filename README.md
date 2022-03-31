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
3. Open `index.html` in your web browser.  (either double-click or drag it into your web browser)
4. Copy the URL from the web browser's location box at the top (it'll format it the way we need for the OBS browser source).
5. In OBS, add a new browser source and paste the URL into the URL field, then add `?websocket_host=1.2.3.4` to the end of the URL, 
   replacing `1.2.3.4` with the IP address of your gaming PC.  Here's an example of what that URL might look like, 
   yours will be slightly different: 

```
file:///C:/Users/subpa/Desktop/universal-song-overlay/index.html?websocket_host=10.0.0.29
```

5. For each game you want to use with the overlay, make sure to check game-specific requirements below.

# Game-specific Requirements

## Synth Riders

1. Install the [Synth Riders Websocket mod](https://github.com/KK964/SynthRiders-Websockets-Mod) - this is what publishes game data used by the overlay.

2. Configure Synth's Song Status as per step 1 of [these instructions](https://docs.google.com/document/d/13Ei4bYQRvvhUBIl4Uc5rwls-gvzsQ78bXoJQKQ_qaLo/edit#heading=h.xsyyveoj8zvr). You do not need to do step 2. Note that the important part is making sure that `{{CoverImage}}` is included in the file.  This is what produces the album art for the current song.

## Audica

1. Install the [Audica Websocket Server mod](https://github.com/steglasaurous/audica-websocket-server) as per its instructions.

# Configuration Options

The following options can be passed to the browser overlay by adding a query string at the end of the URL.

## Options List

`websocket_host` - The IP address or host name of the websocket server(s).  Useful for 2-pc stream setups where
the websocket server(s) may be running on a different machine.  Default is localhost. **NOTE** This will ONLY work
with the 2-PC setup option above.

Examples:

```
# Connect to websocket server(s) on another machine (for 2-pc stream setups):
https://steglasaurous.github.io/universal-song-overlay/?websocket_host=10.0.0.29
```
