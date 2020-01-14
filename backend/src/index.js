require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

const PORT = process.env.PORT || 3333;

mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_USER_LOGIN}:${process.env.MONGODB_USER_PASSWORD}@${process.env.MONGODB_URL}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`App running on port: ${PORT}`);
});
