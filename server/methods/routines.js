Meteor.methods({
    
    addRoutine(routine) {
        // Make sure the user is logged in before inserting a routine
        if (! Meteor.userId()) {
          //throw new Meteor.Error("not-authorized");
        }
        console.log(routine)
        Routines.insert(routine , function (error, result) {
            if (error) {
                throw error;
            }
        });
    },
    editRoutine(routine) {
        if (! Meteor.userId()) {
          //throw new Meteor.Error("not-authorized");
        }
        Routines.update({_id: routine._id}, routine , function (error, result) {
            if (error) {
                throw error;
            }
        });
    },

    removeRoutine(routine) {
        if (! Meteor.userId()) {
          //throw new Meteor.Error("not-authorized");
        }
        Routines.remove({_id: routine._id}, function (error, result) {
            if (error) {
                throw error;
            }
        });
    }
});