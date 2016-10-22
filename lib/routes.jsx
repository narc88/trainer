function checkLoggedIn (ctx, redirect) {  
  if (!Meteor.userId()) {
    redirect('/')
  }
}

function redirectIfLoggedIn (ctx, redirect) {  
  if (Meteor.userId()) {
    redirect('/dashboard')
  }
}

FlowRouter.route('/', {
  
  //triggersEnter: [function(context, redirect) {
  //  redirect('/some-other-path');
  //}],
  triggersEnter: [checkLoggedIn],
  action: function() {
    const containerElement = document.getElementById("render-app");
    React.render(<App/>, containerElement);
    //React.render(<App />, document.getElementById("render-target"));
  }
  // calls when when we decide to move to another route
  // but calls before the next route started
  
  //triggersExit: [trackRouteClose]

});

FlowRouter.route('/sessions', {
  triggersEnter: [checkLoggedIn],
  action: function() {
    const containerElement = document.getElementById("render-target");
    React.render(<SessionList/>, containerElement);
  }
});


FlowRouter.route('/sessions/:id', {
  triggersEnter: [checkLoggedIn],
  action: function(params) {
    const containerElement = document.getElementById("render-target");
    React.render(<Session id={params.id}/>, containerElement);
  }
});

FlowRouter.route('/sessions/actual', {
  triggersEnter: [checkLoggedIn],
  action: function() {
    const containerElement = document.getElementById("render-target");
    React.render(<Session/>, containerElement);
  }
});


FlowRouter.route('/sessions/complete', {
  triggersEnter: [checkLoggedIn],
  
  action: function() {
    const containerElement = document.getElementById("render-target");
    React.render(<Session/>, containerElement);
  }
});


FlowRouter.route('/profile', {
  triggersEnter: [checkLoggedIn],
  
  action: function() {
    const containerElement = document.getElementById("render-target");
    React.render(<ProfileForm/>, containerElement);
  }
});


FlowRouter.route('/calendar', {
  
  action: function() {
    const containerElement = document.getElementById("render-target");
    React.render(<Calendar/>, containerElement);
  }
});



FlowRouter.route('/sessions/add', {
  triggersEnter: [checkLoggedIn],
  action: function() {
    Meteor.call('addRoutine', 'abracadabra' ,function (error, result) {
      if (error) {
          console.log(error);
      }else{
          console.log(result);
      }
    });
  }
});

FlowRouter.route('/playSession/:id', {
  triggersEnter: [checkLoggedIn],
  action: function(params) {
    const containerElement = document.getElementById("render-target");
    React.render(<PlaySession id={params.id}/>, containerElement);
  }
});


FlowRouter.route('/sessions', {
  triggersEnter: [checkLoggedIn],
  
  action: function() {
    const containerElement = document.getElementById("render-target");
    React.render(<SessionList/>, containerElement);
  }
});

FlowRouter.route('/sessions/:id', {
  triggersEnter: [checkLoggedIn],
  
  action: function(params) {
    const containerElement = document.getElementById("render-target");
    React.render(<Session id={params.id}/>, containerElement);
  }
});


/*Appointments*/
FlowRouter.route('/turns', {
  triggersEnter: [checkLoggedIn],
  
  action: function() {
    const containerElement = document.getElementById("render-target");
    React.render(<TurnList/>, containerElement);
  }
});


FlowRouter.route('/turns/:id', {
  triggersEnter: [checkLoggedIn],
  
  action: function(params) {
    const containerElement = document.getElementById("render-target");
    React.render(<Appointment appointment-id={params.id}/>, containerElement);
  }
});


/*Gyms*/
FlowRouter.route('/gyms', {
  triggersEnter: [checkLoggedIn],
  
  action: function() {
    const containerElement = document.getElementById("render-target");
    React.render(<GymsList/>, containerElement);
  }
});


FlowRouter.route('/gyms/add', {
  triggersEnter: [checkLoggedIn],
  
  action: function(params) {
    const containerElement = document.getElementById("render-target");
    React.render(<GymsForm/>, containerElement);
  }
});


/*Gyms*/
FlowRouter.route('/clients', {
  triggersEnter: [checkLoggedIn],
  
  action: function() {
    const containerElement = document.getElementById("render-target");
    React.render(<ClientList/>, containerElement);
  }
});


FlowRouter.route('/clients/add', {
  triggersEnter: [checkLoggedIn],
  
  action: function(params) {
    const containerElement = document.getElementById("render-target");
    React.render(<ClientForm/>, containerElement);
  }
});


/*Exercises*/

FlowRouter.route('/exercises/add', {
  triggersEnter: [checkLoggedIn],
  
  action: function(params) {
    const containerElement = document.getElementById("render-target");
    React.render(<ExerciseForm/>, containerElement);
  }
});

FlowRouter.route('/exercises/:id', {
  triggersEnter: [checkLoggedIn],
  
  action: function(params) {
    const containerElement = document.getElementById("render-target");
    React.render(<Exercise id={params.id}/>, containerElement);
  }
});


FlowRouter.route('/exercises', {
  triggersEnter: [checkLoggedIn],
  action: function() {
    const containerElement = document.getElementById("render-target");
    React.render(<ExerciseList/>, containerElement);
  }
});

FlowRouter.route('/images/add/:elementType/:elementId', {
  action: function(params) {
    const containerElement = document.getElementById("render-target");
    React.render(<ImageForm elementType={params.elementType} elementId={params.elementId}/>, containerElement);
  }
});


/*Rutinas*/

FlowRouter.route('/routines', {
  triggersEnter: [checkLoggedIn],
  action: function(params) {
    const containerElement = document.getElementById("render-target");
    React.render(<RoutineList/>, containerElement);
  }
});


FlowRouter.route('/routines/add', {
  triggersEnter: [checkLoggedIn],
  action: function(params) {
    const containerElement = document.getElementById("render-target");
    React.render(<CreateRoutine/>, containerElement);
  }
});


/*Usuarios*/
FlowRouter.route('/login', {
  triggersEnter: [checkLoggedIn],
  action: function(params) {
    const containerElement = document.getElementById("render-target");
    React.render(<Login/>, containerElement);
  }
});

FlowRouter.route('/register', {
  triggersEnter: [checkLoggedIn],
  action: function(params) {
    const containerElement = document.getElementById("render-target");
    React.render(<Register/>, containerElement);
  }
});

FlowRouter.route('/users', {
  triggersEnter: [checkLoggedIn],
  action: function(params) {
    const containerElement = document.getElementById("render-target");
    React.render(<UserList/>, containerElement);
  }
});


FlowRouter.route('/users/:id', {
  
  triggersEnter: [checkLoggedIn],
  action: function(params) {
    const containerElement = document.getElementById("render-target");
    React.render(<UserProfile id={params.id}/>, containerElement);
  }
});

FlowRouter.route('/logout', {
  
  triggersEnter: [checkLoggedIn],
  name: 'logout',
  action: function() {
    Meteor.logout(function(){
      FlowRouter.go('/');
      sAlert.info("You've been signed out.", {effect: 'stackslide', position: 'top-left', timeout: 2000,});
    });
  }
});

/*
FlowRouter.route('/routine/full_view/:routineId', {
  
  //triggersEnter: [function(context, redirect) {
  //  redirect('/some-other-path');
  //}],
  action: function() {
    const containerElement = document.getElementById("app-container");
    ReactDOM.render(<Routine/>, containerElement);
  }
  // calls when when we decide to move to another route
  // but calls before the next route started
  
  //triggersExit: [trackRouteClose]

});


FlowRouter.route('/routine/index', {
  
  //triggersEnter: [function(context, redirect) {
  //  redirect('/some-other-path');
  //}],
  
  action: function() {
    const containerElement = document.getElementById("app-container");
    ReactDOM.render(<AppBody postId={params.postId}><AppBody/>, containerElement);
  },
  // calls when when we decide to move to another route
  // but calls before the next route started
  
  //triggersExit: [trackRouteClose]

});


FlowRouter.route('/profile/view', {
  
  //triggersEnter: [function(context, redirect) {
  //  redirect('/some-other-path');
  //}],
  
  action: function() {
    const containerElement = document.getElementById("app-container");
    ReactDOM.render(<AppBody postId={params.postId}><AppBody/>, containerElement);
  },
  // calls when when we decide to move to another route
  // but calls before the next route started
  
  //triggersExit: [trackRouteClose]

});

FlowRouter.notFound = {
    // Subscriptions registered here don't have Fast Render support.
    subscriptions: function() {

    },
    action: function() {

    }
};
*/

