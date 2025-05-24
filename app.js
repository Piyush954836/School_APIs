const express = require('express');
const app = express();
const schoolRoutes = require('./routes/schoolRoutes');
require('dotenv').config();

app.use(express.json());
app.use('/', schoolRoutes);

const PORT = process.env.DB_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on  http://localhost:${PORT}`)
})