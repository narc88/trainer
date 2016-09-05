Meteor.publish("gyms", function () {
  return Gyms.find({});
});