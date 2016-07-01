Meteor.methods({
    
    addExercise(exercise) {
        // Make sure the user is logged in before inserting a routine
        if (! Meteor.userId()) {
          //throw new Meteor.Error("not-authorized");
        }
        console.log(exercise)
        Exercises.insert(exercise , function (error, result) {
            if (error) {
                throw error;
            }
        });
    },
    editExercise(exercise) {
        if (! Meteor.userId()) {
          //throw new Meteor.Error("not-authorized");
        }
        Exercises.update({_id: exercise._id}, exercise , function (error, result) {
            if (error) {
                throw error;
            }
        });
    },

    removeExercise(exercise) {
        if (! Meteor.userId()) {
          //throw new Meteor.Error("not-authorized");
        }
        Exercises.remove({_id: exercise._id}, function (error, result) {
            if (error) {
                throw error;
            }
        });
    }
});