var express = require('express');
var todoController = require('./controllers/todoController');
var app = express();


app.use(express.static('./assets'));

//fire the controller
todoController(app);

app.listen(3000);
console.log("App started at port 3000");


