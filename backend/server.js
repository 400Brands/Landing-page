// server.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Replace with your actual keys
const API_KEY = "AIzaSyCRVhTaKN7Auk17Gi1uphnZ17BvBO4IZzc";
const CX_ID = "1655943010b844a74";

app.use(cors());

app.get("/api/cac-google-search", async (req, res) => {
  const query = req.query.name;
  // if (!query) {
  //   return res.status(400).json({ error: "Missing brand name" });
  // }

  try {
    const smartQuery = `"flutterwave" site:search.cac.gov.ng`;
    const url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX_ID}&q=${encodeURIComponent(
      smartQuery
    )}`;

    const { data } = await axios.get(url);

    const results = (data.items || []).map((item) => ({
      title: item.title,
      link: item.link,
      snippet: item.snippet,
      displayLink: item.displayLink,
    }));

    res.json({ success: true, results });
  } catch (err) {
    console.error("Search API error:", err.response?.data || err.message);
    res.status(500).json({ success: false, error: "Search failed" });
  }
});


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
