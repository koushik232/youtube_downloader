const express = require('express');
const ytdl = require('ytdl-core');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('YouTube Audio Downloader is running');
});

app.get('/download', async (req, res) => {
  const videoURL = req.query.url;
  if (!videoURL || !ytdl.validateURL(videoURL)) {
    return res.status(400).send('Invalid or missing YouTube URL');
  }

  res.header('Content-Disposition', 'attachment; filename="audio.mp3"');
  ytdl(videoURL, {
    filter: 'audioonly',
    quality: 'highestaudio'
  }).pipe(res);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
