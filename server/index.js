//Primary entry point of the application
require('dotenv').config()
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const app = express();
const router = require('./router')

//DB Setup
mongoose.connect(process.env.MONGODB_URI)


//App Setup
app.use(logger('combined'));
app.use(bodyParser.json({type: '*/*'}));
app.use(bodyParser.urlencoded({
    extended: true
  }))
router(app);

//Server Setup
const PORT = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(
    PORT, () => {
    console.log("Server is running on " + `${PORT}`)}
    );


