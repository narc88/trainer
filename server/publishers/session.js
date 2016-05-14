Meteor.publish("sessions", function () {
  return Sessions.find({});
});

Meteor.publish("exercises", function () {
  return Exercises.find({});
});