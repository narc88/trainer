Meteor.publish("turns", function () {
  return Turns.find({});
});
