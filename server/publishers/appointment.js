Meteor.publish("appointments", function () {
  return Appointments.find({});
});

Meteor.publish("allAppointments", function () {
  return Appointments.find({});
});
