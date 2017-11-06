var express    = require('express');
var bodyParser = require('body-parser');
var jwt        = require('jsonwebtoken');
var app        = express();
var con        = require('./connected');
var config     = require('./config');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('superSecret', config.secret);


app.get('/', function(req, res){
    res.json({"Message":"Hello World"});
})

app.post('/auth', function(req, res){
    var sql      = 'SELECT * FROM user WHERE username = "' + req.body.username + '" AND password = "' + req.body.password + '"';
    var token    = jwt.sign(app.get('superSecret'), {
        expiresInMinutes: 1440
    })
    con.query(sql, function(err, result){
        if(result.length > 0){
            res.json({"Error": false, "Message": "Yeayyy"});
        }else{
            res.json({"Error": true, "Message": "Username & Password dont match", "Token": token});
        }
    });
    
})

app.listen(3000);
