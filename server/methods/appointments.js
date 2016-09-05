Meteor.methods({
    
    addAppointment(appointment) {
        // Make sure the user is logged in before inserting a routine
        if (! Meteor.userId()) {
          //throw new Meteor.Error("not-authorized");
        }
        console.log('addAppointment')
        console.log(appointment)
        Appointments.insert(appointment , function (error, result) {
            if (error) {
                console.log(error)
                throw error;
            }
            console.log(result)
        });
    },
    editAppointment(appointment) {
        if (! Meteor.userId()) {
          //throw new Meteor.Error("not-authorized");
        }
        Appointments.update({_id: appointment._id}, appointment , function (error, result) {
            if (error) {
                throw error;
            }
        });
    },

    removeAppointment(appointment) {
        if (! Meteor.userId()) {
          //throw new Meteor.Error("not-authorized");
        }
        Appointments.remove({_id: appointment._id}, function (error, result) {
            if (error) {
                throw error;
            }
        });
    }
});