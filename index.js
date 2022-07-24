var express = require('express');
var formidable = require('formidable');
var app = express();
var handlebars = require('express3-handlebars').create({defaultLayout:'main'})
var fortune = require('./lib/fortune')
app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')
app.set('port',process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));
app.use(require('body-parser')());
app.get('/', function(req,res){
    res.render('home')
})

app.get('/about', function(req,res){
    res.render('about', {fortune: fortune.getFortune()});
})

app.get('/newsletter', function(req,res){
    res.render('newsletter', {csrf: 'CSRF toekn goes here'});
})

app.get('/contest/vacation-photo', function(req,res){
    var now = new Date();
    res.render('/content/vacation-photo',{
        year: now.getFullYear(), month: now.getMonth()
    });
})

app.post('/contest/vacation-photo/:year/:month', function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files){
        if(err){
            return res.redirect(303, '/error');
        }
        console.log('received fields:');
        console.log(files);
        console.log('received files:');
        console.log(files);
        res.redirect(303, '/thank you');
    })
})

app.post('/process', function(req,res){
    console.log('Form (from querystring): ' + req.query.form);
    console.log('CSRF toekn (from hidden form field): '+ req.body._csrf);
    console.log('Name (from visible form field): '+ req.body.name);
    console.log('Email (from visible form field): '+ req.body.email);
    res.redirect(303, '/thank-you')
})

//custom 404 page
app.use(function(req, res){
    res.status(404);
    res.render('404');
})

//custom 500 page
app.use(function(req,res){
    res.status(500);
    res.render('500');
})

app.listen(app.get('port'), function(){
    console.log('Express Started on http://localhost:'+app.get('port')+'; press Ctrl-C to terminate.');
})