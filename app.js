var express = require("express");
var server = express();
var mongoose = require("mongoose");
mongoose.connect(
"mongodb+srv://seifeldin:Sx4ykooNtft8davP@cluster0.nylt8ei.mongodb.net/moviesapp?retryWrites=true&w=majority&appName=Cluster0"
).then(()=>{
    console.log("Connected successfully");
}).catch((err)=>{
    console.log("Failed to connect");
})

var movies = require("./models/movies.js");

server.use(express.urlencoded({ extended: true }));
server.use(express.json());


server.get("/allMovies", (req, res) => {
    movies.find().then((data)=>
    {
        if(data)
        {
            res.json(data);
        }
        else
        {
            res.json({msg: "No movies present"});
        }
    }).catch((err)=>{
        res.json({msg:"error"});
    })
  });

  server.get("/movie/:id", (req, res) => {
    var movieid = +req.params.id;
    movies.findOne({id:movieid}).then((movie)=>
    {
        if(movie)
        {
            res.json({movieData:movie});
        }
        else
        {
            res.json({msg: "Wrong id"});
        }
    }).catch((err)=>
    {
        res.json({msg:"error"});
    })
  });



  server.post("/addMovie", (req, res) => {
    var data = req.body;
    var newMovie = new movies(
        {
            adult: data.adult,
               backdrop_path: data.backdrop_path,
               genre_ids: data.genre_ids,
               id: data.id,
               original_language: data.original_language,
               original_title: data.original_title,
               overview: data.overview,
               popularity: data.popularity,
               poster_path: data.poster_path,
               release_date: data.release_date,
               title: data.title,
               video: data.video,
               vote_average: data.vote_average,
               vote_count: data.vote_count
           }
    );
    try {
        newMovie.save().then(()=>{
            console.log('movie added successfully');
            res.json({msg: 'movie added successfully'});
        })
    } catch (error) {
     console.log("error");
     res.json({msg: 'error could not add movie'});
    }
  });



server.listen(3003, () => {
    console.log("Server Connected");
  });
