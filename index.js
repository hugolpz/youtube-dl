// From Youtube ID, gets video and automatic subtitle in defined language. Loop on videos listed in data.js.
// Riqures NodeJS and web connexion.
// To run in terminal, try something like:
// npm install
// node ./index.js
const data = require('./data.js');
const fs = require('fs');
const youtubedl = require('youtube-dl');

/* Directories missing > creation ********************************* */
var path = require('path');
//const fs = require('fs');

var ensureDirectoryExistence = function(filePath) {
	var dirname = path.dirname(filePath);
	if (fs.existsSync(dirname)) { return true; }
	ensureDirectoryExistence(dirname);
	fs.mkdirSync(dirname);
}
var dir = './videos/0';
ensureDirectoryExistence(dir);

const Subtitle = require('subtitle-utils');
var vttToSRT= function(vttSubs){ return Subtitle.fromVTT(vttSubs).toSRT() };

/* Url, Embeding ************************************************* */
var getVideoUrl = function(id){ return "https://www.youtube.com/watch\?v="+id },
		getEmbedingCode = function(id,width) { return `
      <iframe width="`+width+`" height="`+(width/16*9)+`"
      src="https://www.youtube.com/embed/`+id+`"
      frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`}

/* Youtube formats ************************************************ /
		  > JSON https://jsoneditoronline.org/?id=cbb474ba8f824a4fa375a6f857d524e7 > "formats"
			[0]139 - audio only (DASH audio) 22050
			[1]140 - audio only (DASH audio) 44100
		  [6]136 - 1280x720 (DASH video) mp4
		  [7]137 - 1920x1080 (DASH video) mp4
		  [12]22 - 1280x720 (hd720) mp4          /* */

/* Loop ********************************************************** */
for(var k=0;k<data.length;k++){
  var d = data[k];
	var filename = d.section+'_'+d.expert+'_'+d.id+'.mp4';
  var videoUrl = getVideoUrl(d.id);
  console.log('Download started');

	/* getVideo ***************************************************** /
  var video = youtubedl(videoUrl,
  ['--format=22'],      // Optional arguments passed to youtube-dl. '--write-auto-sub',
  { cwd: __dirname });  // Additional options can be given for calling `child_process.execFile()`.

  // Will be called when the download starts.
  video.on('info', function(info) {
	  console.log('Download started');
	  console.log('filename: ' + info._filename);
	  console.log('size: ' + info.size);
	 	//  console.log('size: ' + JSON.stringify(info));
	 	console.log('cwd: '+__dirname)
  });

  video.pipe(fs.createWriteStream(dir+filename));

	/* getSubtles ***************************************************/
	// https://github.com/przemyslawpluta/node-youtube-dl/blob/3349cbb6e067b6c9e7605acfa4f9d1ccc895fb0c/lib/youtube-dl.js#L328-L359
	var options = {
	  auto: true, // Write automatic subtitle file (youtube only)
	  all: false, // Downloads all the available subtitles.
	  lang: 'fr', // Languages of subtitles to download, separated by commas.
		format: 'srt', // Accepts formats preference: "srt" or "ass/srt/best"
	  cwd: __dirname+'/vtt/', // The directory to save the downloaded files in.
	};
	var sub = youtubedl.getSubs(
		videoUrl,
		options,
		function(err, files) {
	  	if (err) throw err;
	  	console.log(k,'subtitle files downloaded:', files);
	});

}
