// Get our dependencies
var express = require('express');
var app = express();
var mysql = require("mysql");
var dotenv = require('dotenv');
dotenv.config();
var connection = mysql.createConnection({
  host     : process.env.DB_HOST || 'localhost',
  user     : process.env.DB_USER || 'root',
  password : process.env.DB_PASS || 'password',
  database : process.env.DB_NAME || 'movie_db'
 });


connection.connect(function(error){
   if(error){
      throw error;
   }else{
      console.log('Conexion correcta.');
   }
});

function getMoviesReviews(callback) {
        connection.query("SELECT * FROM movie_db.moviereview",
            function (err, rows) {
                callback(err, rows);
            }
        );
}

function getReviewers(callback) {
        connection.query("SELECT * FROM movie_db.reviewer",
            function (err, rows) {
                callback(err, rows);
            }
        );
}

function getPublications(callback) {
        connection.query("SELECT * FROM movie_db.publication",
            function (err, rows) {
                callback(err, rows);
            }
        );
}

//Testing endpoint
app.get('/', function(req, res){
  var response = [{response : 'hello'}, {code : '200'}]
  res.json(response);
})

// Implement the movies API endpoint
app.get('/movies', function(req, res){
  getMoviesReviews(function (err, moviesResult){
       //you might want to do something is err is not null...      
       res.json(moviesResult);
       console.log('Conexion correcta.');
    });
})

// Implement the reviewers API endpoint
app.get('/reviewers', function(req, res){
  getReviewers(function (err, reviewersResult){
       //you might want to do something is err is not null...      
       res.json(reviewersResult);
    });
})

// Implement the publications API endpoint
app.get('/publications', function(req, res){
  getPublications(function (err, publicationsResult){
       //you might want to do something is err is not null...      
       res.json(publicationsResult);
    });
})

// Implement the pending reviews API endpoint
app.get('/pending', function(req, res){
  var pending = [
    {title : 'Superman: Homecoming', release: '2017', score: 10, reviewer: 'Chris Harris', publication: 'International Movie Critic'},
    {title : 'Wonder Woman', release: '2017', score: 8, reviewer: 'Martin Thomas', publication : 'TheOne'},
    {title : 'Doctor Strange', release : '2016', score: 7, reviewer: 'Anthony Miller', publication : 'ComicBookHero.com'}
  ]
  res.json(pending);
})
console.log("server listening through port: "+process.env.PORT);
// Launch our API Server and have it listen on port 3000.
app.listen(process.env.PORT || 3000);
module.exports = app;
