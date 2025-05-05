const express = require('express');
const ytdl = require('ytdl-core');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/download', (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl) {
    return res.status(400).send('Video URL is required');
  }

  if (ytdl.validateURL(videoUrl)) {
    ytdl.getInfo(videoUrl).then(info => {
      const title = info.videoDetails.title.replace(/[^\w\s]/gi, '');
      res.header('Content-Disposition', `attachment; filename="${title}.mp3"`);

      ytdl(videoUrl, { filter: 'audioonly', quality: 'highestaudio' }).pipe(res);
    }).catch(err => {
      res.status(500).send('Failed to retrieve video info');
    });
  } else {
    res.status(400).send('Invalid YouTube URL');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
