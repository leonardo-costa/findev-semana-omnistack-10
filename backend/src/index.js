const express = require('express');

const app = express();

const PORT = process.env.PORT || 3333;

app.get('/', (req, res) => {
  return res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`App running on port: ${PORT}`);
});
