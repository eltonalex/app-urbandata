const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://user_urbandata:urbandata2020@cluster0-4ymsx.mongodb.net/urbandata?retryWrites=true&w=majority',{
   useNewUrlParser: true, 
   useUnifiedTopology: true, });

//cors é usado para liberar o acesso externo a api 
app.use(cors());
app.use(express.json());
app.use(routes);

var porta = process.env.PORT || 8080;
console.log(porta);

// Definição da porta de acesso, anterior 3335
app.listen(porta);
