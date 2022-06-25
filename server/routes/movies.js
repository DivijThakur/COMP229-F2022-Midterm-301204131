/* 
  FILE NAME: COMP229-S2022-MidTerm-301204131
  NAME : DIVIJ THAKUR
  STUDENTID : 301204131
  WEB APP NAME : MOVIES APP
   */

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose'); () => { }

// call the movies model****************************
let movies = require('../models/movies');

/* GET movies List page. READ */
router.get('/', (req, res, next) => {
  // find all movie in the books collection
  movies.find((err, list) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('movies/index', {
        title: 'Movies',
        list: list
      });
    }
  });
});

//  GET the Movies Details page in order to add a new Movies
router.get('/add', (req, res, next) => {

  /*****************
     * ADD CODE HERE *
     *****************/

  res.render('movies/details', { title: 'Add Movie', list: [] });
});

//Movie editing display page
router.get('/edit/:id', (req, res, next) => {
  let movieid = req.params.id;
  movies.findById(movieid, (err, MovieToEdit) => { //result stored in Object MovieToEdit
    if (err) {
      console.log(err);
      res.end(err);
    }
    else {
      res.render('movies/details', { title: 'Edit a Book ', list: MovieToEdit })
    }
  });
});

//editing movie process 
router.post('/edit/:id', (req, res, next) => {
  let movieid = req.params.id;
  let updateMovie = movies({
    "_id": movieid,
    "Title": req.body.title,
    "Description": req.body.description,
    "Released": req.body.released,
    "Director": req.body.director,
    "Genre": req.body.genre
  });

  movies.updateOne({ _id: movieid }, updateMovie, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    }
    else {
      res.redirect('/movies');
    }
  });
});


// POST process the Movies Details page and create a new Movies - CREATE
router.post('/add', (req, res, next) => {

  /*****************
     * ADD CODE HERE *
     *****************/

  console.log(req.body.Title);
  let newmovie = movies({
    "Title": req.body.title,
    "Description": req.body.description,
    "Released": req.body.released,
    "Director": req.body.director,
    "Genre": req.body.genre
  });
  movies.create(newmovie, (err, _) => {
    if (err) {
      console.log(err);
      res.end(err);
    }
    else {
      res.redirect('/movies');
    }
  });

});


// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

  /*****************
     * ADD CODE HERE *
     *****************/

  let movieid = req.params.id;
  movies.remove({ _id: movieid }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    }
    else {
      res.redirect('/movies');
    }
  });
});

module.exports = router;
