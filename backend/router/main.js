require('dotenv').config();
const express = require('express');
const { TwitterApi } = require('twitter-api-v2');

// Initialize Express app
const app = express();
const port = 3000;

// Twitter client setup
const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_KEY_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

// GET route to fetch tweets based on a query
app.get('/tweets', async (req, res) => {
  const query = req.query.query || 'OpenAI';
  const count = parseInt(req.query.count, 10) || 10;

  try {
    // Search for tweets using the Twitter API
    const tweets = await twitterClient.v2.search(query, {
      max_results: count,
      'tweet.fields': 'text',
    });

    // Extract relevant data from the tweet response
    const tweetData = tweets.data.map(tweet => ({
      id: tweet.id,
      text: tweet.text,
    }));

    res.json(tweetData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching tweets' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
