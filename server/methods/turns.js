Meteor.methods({
    
    addTurn(turn) {
        // Make sure the user is logged in before inserting a routine
        if (! Meteor.userId()) {
          //throw new Meteor.Error("not-authorized");
        }
        console.log(turn)
        Turns.insert(turn , function (error, result) {
            if (error) {
                throw error;
            }
        });
    },
    editTurn(turn) {
        if (! Meteor.userId()) {
          //throw new Meteor.Error("not-authorized");
        }
        Turns.update({_id: turn._id}, turn , function (error, result) {
            if (error) {
                throw error;
            }
        });
    },

    removeTurn(turn) {
        if (! Meteor.userId()) {
          //throw new Meteor.Error("not-authorized");
        }
        Turns.remove({_id: turn._id}, function (error, result) {
            if (error) {
                throw error;
            }
        });
    }
});