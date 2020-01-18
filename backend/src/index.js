require('dotenv').config();

const express = require('express');
const cors = require('cors');
const http = require('http');
const mongoose = require('mongoose');

const routes = require('./routes');
const { setupWebsocket } = require('./websocket');

const app = express();
const server = http.Server(app);

setupWebsocket(server);

const PORT = process.env.PORT || 3333;

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_URL}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(PORT);
