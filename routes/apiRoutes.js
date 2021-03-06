const db = require("../models");
const router = require("express").Router();

//seeder code
//  db.Workout.find({}).then(function (res) {
//     console.log("Checking if db is populated");
//     if (res.length === 0) {
//          require("../seeders/seed.js");
//      }
//  });

//get workouts
router.get("/api/workouts", (req, res) => {

    db.workout.find({}).then(dbWorkout => {
        dbWorkout.forEach(workout => {
            var totalTime = 0;
            workout.exercises.forEach(elem => {
                totalTime += elem.duration;
            });
            workout.totalDuration = totalTime;

        });

        res.json(dbWorkout);
    }).catch(err => {
        res.json(err);
    });
});

// add exercise
router.put("/api/workouts/:id", (req, res) => {

    db.workout.findOneAndUpdate(
        { _id: req.params.id },
        {
            $inc: { totalDuration: req.body.duration },
            $push: { exercises: req.body }
        },
        { new: true }).then(dbWorkout => {
            res.json(dbWorkout);
        }).catch(err => {
            res.json(err);
        });

});

//create workout
router.post("/api/workouts", ({ body }, res) => {
    db.workout.create(body).then((dbWorkout => {
        res.json(dbWorkout);
    })).catch(err => {
        res.json(err);
    });
});

// get workouts in range
router.get("/api/workouts/range", (req, res) => {

    db.workout.find({}).then(dbWorkout => {
        console.log("ALL WORKOUTS");
        console.log(dbWorkout);

        res.json(dbWorkout);
    }).catch(err => {
        res.json(err);
    });

});


module.exports = router;