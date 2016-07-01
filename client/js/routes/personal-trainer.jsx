

if (Meteor.isClient) {
  // This code is executed on the client only
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
  
  var subscription = Meteor.subscribe("exercises");

  Meteor.startup(function () {
    // Use Meteor.startup to render the component after the page is ready
    //React.render(<App />, document.getElementById("render-target"));
  });
}

if (Meteor.isServer) {
  // Only publish tasks that are public or belong to the current user
  
}


