const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from the terminal backend! ✅' });
});

app.listen(port, () => {
  console.log(`Backend server is running at http://localhost:${port}`);
});
