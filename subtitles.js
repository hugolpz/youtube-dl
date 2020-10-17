// From Youtube ID, gets automatic subtitle in defined language. Loop on videos listed in data.js.
// Riqures NodeJS and web connexion.
// To run in terminal, try something like:
// npm install
// node ./subtitles.js
const data = require('./data.js');
const getYouTubeID = require('get-youtube-id');
const { getSubtitles } = require('youtube-captions-scraper');

// central tool
const getYouTubeSubtitles = async youtubeUrl => {
  try {
    const videoID = getYouTubeID(youtubeUrl);
    const subtitles = await getSubtitles({ videoID }); // JSON of subtitles
    // console.log('subs: ', subtitles)
    return subtitles.reduce(
      (accumulator, currentSubtitle) =>
        `${accumulator} ${currentSubtitle.text}`,
      ''
    );
  } catch (error) {
    console.log(`Error getting captions: ${error.message}`);
  }
};

// main call
(async () => {
  const consoleArguments = process.argv;
  if (consoleArguments.length !== 3) {
    console.log(
      'usage example: node subtitles.js https://www.youtube.com/watch?v=gypAjPp6eps'
    );
    return;
  }

  const subtitles = await getYouTubeSubtitles(consoleArguments[2]);
  // console.log(subtitles);
})();
