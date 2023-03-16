const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const imagineRoutes = require('./routes/imagePromptRoutes');
const imageRoutes = require('./routes/imageRoutes');
const verifyToken = require('./middlewares/verifyToken');
const app = express();

// Veritabanına bağlanmak için mongoose kullanılır.
mongoose.connect('mongodb://localhost:27017/image', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', userRoutes);
app.use('/images', imageRoutes);
app.use('/imagine', verifyToken, imagineRoutes);

// Uygulama belirtilen portta dinlemeye başlar.
app.listen(3000, () => {
  console.log('Uygulama http://localhost:3000 adresinde çalışıyor.');
});
