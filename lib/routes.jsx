

FlowRouter.route('/', {
  
  //triggersEnter: [function(context, redirect) {
  //  redirect('/some-other-path');
  //}],
  
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
  action: function() {
    const containerElement = document.getElementById("render-target");
    React.render(<SessionList/>, containerElement);
  }
});


FlowRouter.route('/sessions/:id', {
  action: function(params) {
    const containerElement = document.getElementById("render-target");
    React.render(<Session id={params.id}/>, containerElement);
  }
});

FlowRouter.route('/sessions/actual', {
  action: function() {
    const containerElement = document.getElementById("render-target");
    React.render(<Session/>, containerElement);
  }
});


FlowRouter.route('/sessions/complete', {
  
  action: function() {
    const containerElement = document.getElementById("render-target");
    React.render(<Session/>, containerElement);
  }
});


FlowRouter.route('/profile', {
  
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
  action: function(params) {
    const containerElement = document.getElementById("render-target");
    React.render(<PlaySession id={params.id}/>, containerElement);
  }
});


FlowRouter.route('/sessions', {
  
  action: function() {
    const containerElement = document.getElementById("render-target");
    React.render(<SessionList/>, containerElement);
  }
});

FlowRouter.route('/sessions/:id', {
  
  action: function(params) {
    const containerElement = document.getElementById("render-target");
    React.render(<Session id={params.id}/>, containerElement);
  }
});



FlowRouter.route('/exercises/add', {
  
  action: function(params) {
    const containerElement = document.getElementById("render-target");
    React.render(<ExerciseForm/>, containerElement);
  }
});

FlowRouter.route('/exercises/:id', {
  
  action: function(params) {
    const containerElement = document.getElementById("render-target");
    React.render(<Exercise id={params.id}/>, containerElement);
  }
});


FlowRouter.route('/exercises', {
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


FlowRouter.route('/routines/add', {
  action: function(params) {
    const containerElement = document.getElementById("render-target");
    React.render(<CreateRoutine/>, containerElement);
  }
});


/*Usuarios*/
FlowRouter.route('/login', {
  action: function(params) {
    const containerElement = document.getElementById("render-target");
    React.render(<Login/>, containerElement);
  }
});

FlowRouter.route('/register', {
  action: function(params) {
    const containerElement = document.getElementById("render-target");
    React.render(<Register/>, containerElement);
  }
});

FlowRouter.route('/logout', {
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

