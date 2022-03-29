if not exist caddy mkdir caddy
if not exist caddy\caddy.exe powershell.exe Invoke-WebRequest -Uri "https://github.com/caddyserver/caddy/releases/download/v2.4.6/caddy_2.4.6_windows_amd64.zip" -OutFile caddy.zip
if not exist caddy\caddy.exe powershell.exe Expand-Archive caddy.zip -DestinationPath caddy
if not exist dist mkdir dist
if not exist dist powershell.exe Invoke-WebRequest -Uri "https://github.com/steglasaurous/universal-song-overlay/releases/download/v1.1.0/universal-song-overlay.zip" -OutFile dist.zip
if not exist caddy\caddy.exe powershell.exe Expand-Archive dist.zip -DestinationPath dist
caddy\caddy.exe run
