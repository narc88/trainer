Meteor.methods({
    
    addClient(client) {
        // Make sure the user is logged in before inserting a routine
        if (! Meteor.userId()) {
          //throw new Meteor.Error("not-authorized");
        }
        console.log(client)
        Clients.insert(client , function (error, result) {
            if (error) {
                throw error;
            }
        });
    },
    editClient(client) {
        if (! Meteor.userId()) {
          //throw new Meteor.Error("not-authorized");
        }
        Clients.update({_id: client._id}, client , function (error, result) {
            if (error) {
                throw error;
            }
        });
    },

    removeClient(client) {
        if (! Meteor.userId()) {
          //throw new Meteor.Error("not-authorized");
        }
        Clients.remove({_id: client._id}, function (error, result) {
            if (error) {
                throw error;
            }
        });
    }
});