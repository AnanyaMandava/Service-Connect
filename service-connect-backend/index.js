require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors");
const app = express();
const allRoutes = require('./routes/allRoutes');

const mongoString = process.env.DATABASE_URL;

mongoose.set('strictQuery', false);
mongoose.connect(mongoString,{
  useNewUrlParser:true,
  useUnifiedTopology: true
});

const database = mongoose.connection

database.on('error',(error) => {
  console.log(error)
})

database.once('connected', (connected) => {
  console.log('Database connected')
})

app.use(express.json());

app.use(cors());

app.listen(3001, () => {
  console.log(`Server listening on 3001`);
});

app.use('', allRoutes);