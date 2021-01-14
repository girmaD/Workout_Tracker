const router = require('express').Router()

const db = require('../models');

router.get('/api/workouts', (req, res) => {    
    db.Workout.aggregate([
        {
            $addFields: {
                totalDuration: { $sum: "$exercises.duration" }
            }
        }
    ])
    .then(workoutdb => {
        console.log(workoutdb);
        res.json(workoutdb);
    })
    .catch(err => {
         res.json(err);
    });
});

router.post('/api/workouts', ({body}, res) => {
    db.Workout.create(body)
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
    res.status(400).json(err);
    });
});

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
    ]).then(workout => {
        res.json(workout);
      })
      .catch(err => {
        res.json(err);
      });
});

module.exports = router;