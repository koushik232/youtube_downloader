const express = require('express');
const ytdl = require('ytdl-core');
const cors = require('cors');  // CORS প্যাকেজটি ইমপোর্ট

const app = express();
const port = process.env.PORT || 3000;

// CORS enable করতে middleware হিসেবে ব্যবহার
app.use(cors());

// Download endpoint
app.get('/download', (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl) {
    return res.status(400).send('Video URL is required');
  }

  // YouTube ভিডিও ডাউনলোড
  if (ytdl.validateURL(videoUrl)) {
    res.header('Content-Disposition', 'attachment; filename="audio.mp3"');
    ytdl(videoUrl, { filter: 'audioonly' }).pipe(res);  // Audio-only stream
  } else {
    res.status(400).send('Invalid YouTube URL');
  }
});

// Server start
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
