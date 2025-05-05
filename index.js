const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const app = express();

app.use(cors());

app.get('/download', async (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl || !ytdl.validateURL(videoUrl)) {
    return res.status(400).send('Invalid YouTube URL');
  }

  try {
    const info = await ytdl.getInfo(videoUrl);
    const title = info.videoDetails.title.replace(/[^\w\s]/gi, '');

    res.setHeader('Content-Disposition', `attachment; filename="${title}.mp3"`);

    ytdl(videoUrl, {
      filter: 'audioonly',
      quality: 'highestaudio',
    }).pipe(res);
  } catch (err) {
    res.status(500).send('Failed to download audio');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
