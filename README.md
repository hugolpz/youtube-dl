### Install
```
git clone git@github.com:hugolpz/youtube-dl.git
mkdir -p videos vtt srt 
npm install
```

### Usage
Adapt the data to your need. Data there help to rename files, change as you wish to.
Then run
```
node index.js
```

### Structure
```
|- node_modules		: dev dependencies
|- videos		: videos .mp4
|- srt			: youtube subtitle as srt
|- vtt			: youbtube subtitle as vtt
|- README.md		: README.md manual (here)
|- data.js		: list of youtube address and title to download and rename
|- index.js		: script A : gets youtube videos and automatic subtitles. Requires NodeJS. Test script to see what it does.
|- subtitles.js		: script B : gets automatic subtitles. Requires NodeJS. Test script to see what it does.
|- package.json		: list of script's dependencies
|- package-lock.json	: optional.
```
