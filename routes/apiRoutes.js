const router = require('express').Router()
const db = require('../models');

//a get route that retrieved all data in DB and additional field called totalDuration
router.get('/api/workouts', (req, res) => {    
    db.Workout.aggregate([
        {
            $addFields: {
                totalDuration: { $sum: "$exercises.duration" }
            }
        }
    ])
    .then(dbWorkout => {
        console.log(dbWorkout);
        res.json(dbWorkout);
    })
    .catch(err => {
         res.json(err);
    });
});

//a post route that posts req.body to the database and sends back a data that included the newly added data
router.post('/api/workouts', ({body}, res) => {
    db.Workout.create(body)
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
    res.status(400).json(err);
    });
});

//this route finds data by matching id - then pushes the data in that array. It also increments 
//totalDuration by the newly added duration data
router.put('/api/workouts/:id', (req, res) => {
    db.Workout.findOneAndUpdate(
        { _id: req.params.id },
        {
            $inc: { totalDuration: req.body.duration },
            $push: { exercises: req.body }
        }, { new: true }
    )
    .then(dbWorkout => {
        res.json(dbWorkout);
    }).catch(err => {
        res.json(err);
    });
});

//this route gets the last seven data sorted by day and adds additional field called totalDuration
router.get('/api/workouts/range', (req, res) => {
    db.Workout.aggregate([
        {
            $addFields: {
              totalDuration: { $sum: "$exercises.duration" }           
            }
        },
        {$sort: { day: -1 }
        },
        { $limit : 7 },
        {$sort: {day: 1}}        
    ]).then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
});

module.exports = router;