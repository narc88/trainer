Meteor.methods({
    
    addGym(gym) {
        // Make sure the user is logged in before inserting a routine
        if (! Meteor.userId()) {
          //throw new Meteor.Error("not-authorized");
        }
        console.log(gym)
        Gyms.insert(gym , function (error, result) {
            if (error) {
                throw error;
            }
        });
    },
    editGym(gym) {
        if (! Meteor.userId()) {
          //throw new Meteor.Error("not-authorized");
        }
        Gyms.update({_id: gym._id}, gym , function (error, result) {
            if (error) {
                throw error;
            }
        });
    },

    removeGym(gym) {
        if (! Meteor.userId()) {
          //throw new Meteor.Error("not-authorized");
        }
        Gyms.remove({_id: gym._id}, function (error, result) {
            if (error) {
                throw error;
            }
        });
    }
});