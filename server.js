const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// JSON file to store global visit count
const COUNT_FILE = path.join(__dirname, 'visits.json');

// Middleware to increment global visits for all page loads
app.use((req, res, next) => {
  // Skip admin page so viewing count doesn't increment
  if (req.path === '/admin/visits') return next();

  let data = { count: 0 };

  if (fs.existsSync(COUNT_FILE)) {
    data = JSON.parse(fs.readFileSync(COUNT_FILE, 'utf8'));
  }

  data.count += 1;
  fs.writeFileSync(COUNT_FILE, JSON.stringify(data));

  next();
});

// Serve static website files
app.use(express.static('public'));

// Admin route to view total visits (password protected)
app.get('/admin/visits', (req, res) => {
  const password = req.query.password;
  if (password !== 'YOUR_SECRET_PASSWORD') {
    return res.status(403).send('Forbidden');
  }

  let data = { count: 0 };
  if (fs.existsSync(COUNT_FILE)) {
    data = JSON.parse(fs.readFileSync(COUNT_FILE, 'utf8'));
  }
  res.send(`<h2>Total Website Visits: ${data.count}</h2>`);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
