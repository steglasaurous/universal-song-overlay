if not exist caddy mkdir caddy
if not exist caddy\caddy.exe powershell.exe Invoke-WebRequest -Uri "https://github.com/caddyserver/caddy/releases/download/v2.4.6/caddy_2.4.6_windows_amd64.zip" -OutFile caddy.zip
if not exist caddy\caddy.exe powershell.exe Expand-Archive caddy.zip -DestinationPath caddy
@REM if not exist dist mkdir dist
@REM if not exist dist\universal-song-overlay powershell.exe Invoke-WebRequest -Uri "https://github.com/steglasaurous/universal-song-overlay/releases/download/v0.1.0/universal-song-overlay.zip" -OutFile dist.zip
@REM if not exist dist\universal-song-overlay powershell.exe Expand-Archive dist.zip -DestinationPath dist
caddy\caddy.exe run
