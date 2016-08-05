Meteor.publish("routines", function () {
  return Routines.find({});
});
