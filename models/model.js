const mongoose = require('mongoose');

const MoviesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number
    },
    cast: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'casts'
    }],
    genres: [String],
    extract: {
        type: String
    },
    href: {
        type: String
    },
    thumbnail: {
        type: String
    }
    
})

const CastSchema = new mongoose.Schema({
    name: { type: String, required: true },
    birthyear: {
        type: String,
        required: true
    },
    films: [
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "movies"
        }
    ]
});

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    }
});

const Movies = mongoose.model("movies", MoviesSchema);
const Casts = mongoose.model("casts", CastSchema);
const Users = mongoose.model("users", UserSchema);


module.exports = { Movies, Casts , Users};