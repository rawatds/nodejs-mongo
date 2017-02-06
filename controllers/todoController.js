module.exports = function(app) {

    var mongourl = "mongodb://mongo:S3cret@ds141209.mlab.com:41209/tododb";
    var express = require('express');
    app.set('view engine', 'ejs');

    var bodyParser = require('body-parser');
    var urlEncoder = bodyParser.urlencoded({extended: false});

    var mongoose = require('mongoose');
    mongoose.connect(mongourl);

    var todoSchema = new mongoose.Schema({
        item: String
    });

    var Todo = mongoose.model('Todo', todoSchema);


    app.get('/', function(req, res){
        res.send("Welcome to ToDo app. <a href='/todo'>Start</a>");
    })

    // Handle GET request - show all items
    app.get('/todo', function(req, res){
        Todo.find({}, function(err, data){
            console.log("GET /todo:");
            console.log(data);

            if (err) throw err;
            res.render('todo', {todos: data});
        });
    } );

    //POST
    app.post('/todo', urlEncoder, function(req, res){
        var newTodo = Todo(req.body).save(function(err, data){
            if (err) throw err;
            res.json(data);  
        });
    } );


    app.delete('/todo/:item', urlEncoder, function(req, res){
        Todo.find({item: req.params.item.trim()}).remove(function(err, data){
        //Todo.remove({item: req.params.item.trim()}, function(err, data){ //  OK
            console.log("Going to delete [" + req.params.item.trim() +"]" );
            if (err) throw err;
            res.json(data);  
        });
    } );


}