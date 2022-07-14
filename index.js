var express = require('express');
var app = express();
var handlebars = require('express3-handlebars').create({defaultLayout:'main'})
var fortunes =[
    "Conquer your feares or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you don't know.",
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple."
]
app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')
app.set('port',process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'))

app.get('/', function(req,res){
    res.render('home')
})

app.get('/about', function(req,res){
    var randomfortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('about', {fortune: randomfortune});
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