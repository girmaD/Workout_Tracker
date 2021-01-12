//require mongoose and define mongoose Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const excerciseSchema = new Schema({
    type: {
        type: String,
        trim: true,
        required: 'Please enter the type of the exercise'
    },
    name: {
        type: String,
        trim: true,
        required: 'Please enter the name of the exercise'
    },
    duration: {
        type: Number,        
        required: 'Please enter the duration of the exercise'
    },
    weight: {
        type: Number,        
        required: true
    },
    reps: {
        type: Number,        
        required: true
    },
    sets: {
        type: Number,        
        required: true
    }
})

const Exercise = mongoose.model("Exercise", excerciseSchema);

module.exports = Exercise;