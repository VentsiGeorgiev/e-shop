const express = require('express');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 5000;

const app = express();

app.get('/', (req, res) => {
    res.json({ message: 'e-Shop API' });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));