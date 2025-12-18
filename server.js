const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/gpt", async (req, res) => {
  try {
    const q = req.query.query;
    if (!q) return res.json({ result: "QUERY KOSONG" });

    const api =
      "https://api.zenzxz.my.id/ai/gpt?query=" +
      encodeURIComponent(q);

    const r = await fetch(api);
    const d = await r.json();

    res.json(d);
  } catch (e) {
    res.status(500).json({ result: "ERROR_API", error: e.message });
  }
});

app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(PORT, () => {
  console.log("RUNNING → http://localhost:" + PORT);
});
