var Actor = require('../models/actor');
var Movie = require('../models/movie');
const mongoose = require('mongoose');
const movie = require('../models/movie');

module.exports = {
    getAll: function (req, res) {
        Movie.find({})
        .populate('actors')
        .exec(function (err, movies) {
            if (err) return res.status(400).json(err);
            res.json(movies);
        });
    },
    createOne: function (req, res) {
        let newMovieDetails = req.body;
        newMovieDetails._id = new mongoose.Types.ObjectId();
        Movie.create(newMovieDetails, function (err, movie) {
            if (err) return res.status(400).json(err);
            res.json(movie);
        });
    },
    getOne: function (req, res) {
        Movie.findOne({ _id: req.params.id })
            .populate('actors')
            .exec(function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                res.json(movie);
            });
    },
    updateOne: function (req, res) {
        Movie.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            res.json(movie);
        });
    },
    deleteOne: function (req, res) {
        Movie.findByIdAndDelete({ _id: req.params.id }, function (err,data) {
            if (err) return res.status(400).json(err);
            res.json(data);
        });
    },


    moviesProducedBetweenYear1andYear2: function (req, res) {
        let year1 = req.params.year1;
        let year2 = req.params.year2;

        if(year1 > year2) {
            Movie.where('year').gte(year2).lte(year1).exec(function(err, year) {
                if (err) return res.status(400).json(err);
                if (!year) return res.status(404).json();
                res.json(year);
            }
            )}
    },

    deleteMoviesProducedBetweenYear1andYear2: function (req, res) {
        let year1 = req.params.year1;
        let year2 = req.params.year2;

        if(year1 > year2) {
            Movie.where('year').gte(year2).lte(year1).exec(function(err, year) {
                if (err) return res.status(400).json(err);
                if (!year) return res.status(404).json();
                movie.delete(year);
                res.json();
            }
        )}
    }

};