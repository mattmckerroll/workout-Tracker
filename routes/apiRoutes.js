const db = require("../models");
const router = require("express").Router();

//seeder code
 db.Workout.find({}).then(function (res) {
    console.log("Checking if db is populated");
    if (res.length === 0) {
         require("./seeders/seed.js");
     }
 });

//get workouts
router.get("/api/workouts", (req, res) => {

    db.Workout.find({}).then(dbWorkout => {
        dbWorkout.forEach(workout => {
            var totalTime = 0;
            workout.exercises.forEach(e => {
                totalTime += e.duration;
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

    db.Workout.findOneAndUpdate(
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
    db.Workout.create(body).then((dbWorkout => {
        res.json(dbWorkout);
    })).catch(err => {
        res.json(err);
    });
});

// get workouts in range
router.get("/api/workouts/range", (req, res) => {

    db.Workout.find({}).then(dbWorkout => {
        console.log("ALL WORKOUTS");
        console.log(dbWorkout);

        res.json(dbWorkout);
    }).catch(err => {
        res.json(err);
    });

});


module.exports = router;