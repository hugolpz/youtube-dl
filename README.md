### Install
```
git clone git@github.com:hugolpz/youtube-dl.git
mkdir -p videos vtt str 
npm install
```

### Structure
```
|- node_modules		: dev dependencies
|- videos		: videos .mp4
|- str			: youtube subtitle as str
|- vtt			: youbtube subtitle as vtt
|- README.md		: README.md manual (here)
|- data.js		: list of youtube address and title to download and rename
|- index.js		: script A : gets youtube videos and automatic subtitles. Requires NodeJS. Test script to see what it does.
|- subtitles.js		: script B : gets automatic subtitles. Requires NodeJS. Test script to see what it does.
|- package.json		: list of script's dependencies
|- package-lock.json	: optional.
```
