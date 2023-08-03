
const express = require('express')
const path = require('path')
const app = express();
var cors = require('cors') 
const mongoose = require('mongoose');
app.use(express.urlencoded({extended:false}));
const port = 8000
const url = 'mongodb://localhost:27017/judge';

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true } )
.then(() => console.log('Connected Successfully'))
.catch((err) => { console.error(err); });
app.use(cors())
app.use(express.json())

// Available Routes
app.use('/api/auth', require('./routes/authentication'))
app.use('/api/problems', require('./routes/problem'))


app.listen(port, () => {
  console.log(`Backend Started`)
})








