const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const https = require('https');
const cheerio = require('cheerio');

const app = express();
const PORT = 4000;

app.use(cors());

app.get('/:path(*)', async (req, res) => {
  try {
    const path = req.params.path || '';
    const url = `https://b2a.kz/${path}`;
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'manual',
      agent: new https.Agent({ rejectUnauthorized: false })
    });

    if ([301, 302].includes(response.status)) {
      const redirectUrl = response.headers.get('Location');
      if (!redirectUrl) {
        throw new Error('Redirect location header missing');
      }

      fetch(redirectUrl)
        .then(response => response.text())
        .then(body => {
          const $ = cheerio.load(body);
          const title = $("title").text();
          const description = $('meta[name=description]').attr("content");
          res.json({ redirectUrl, title, description });
        })
        .catch(error => {
          console.error('Error fetching title and description:', error);
          res.status(500).send('Internal Server Error');
        });
    } else {
      const headers = {};
      response.headers.forEach((value, name) => {
        headers[name] = value;
      });
      res.json({ headers });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
