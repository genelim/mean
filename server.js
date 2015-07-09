var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mean');

var Schema = new mongoose.Schema;

var userSchema = Schema({
	username: String,
	email: String
});

var User = mongoose.model('User', userSchema);

app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());

app.get('/users',function(request, response){
	User.find(function(err, user){
		response.json(user);
	});
});

app.delete('/users/:id', function(request, response){
	User.findOneAndRemove({_id:request.params.id},function(err,user){
		if(err){
			throw err;
		}
		response.json(user);
	});
});

app.post('/users', function(request, response){
	var user = new User(request.body);
	user.save(function (err, user) {
		if(err){
			throw err;
		}
		response.json(user);
	});
});

app.get('/servicess/:id',function(req,res){
	User.findOne({_id:req.params.id},function(err,user){
		if(err){
			throw err;
		}
		res.json(user);
	});
});

app.put('/servicess/:id',function(req,res){
	User.findByIdAndUpdate(req.params.id, { username: req.body.username , email: req.body.email }, function(err, user) {
	  	if (err) throw err;
		res.json(user);
	});
});


app.listen(3000);

