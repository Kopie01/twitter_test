var express = require('express');
var cors = require('cors');
var app = express();
var config = require('./config');
var Twit = require('twit');
var T = new Twit({
  consumer_key:         config.TConsumerKey,
  consumer_secret:      config.TConsumerKeySecret,
  access_token:         config.TAccessToken,
  access_token_secret:  config.TAccessTokenSecret,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests. 
})

app.use(function(request, response, next){
	console.log(`${request.method}request for ${request.url}`);
	next();
});

app.get("/search=:term", function(request,response){
	var term = request.params.term;
	var params = {q:term, count:1};
	T.get('search/tweets', params, function(error, tweets, twitterResponse){

		if(!error){
			response.json(tweets);
		}

	});
});

app.use(cors());

app.get("/trends", function(request, response){
	var params = {id:23424916};
	T.get('trends/place', params, function(error, trends, twitterResponsei){
		console.log(trends);
		if(!error){
			response.json(trends);
		}
	});
});




app.use(express.static("./public"));

app.listen(3000);

console.log("server running on port 3000");