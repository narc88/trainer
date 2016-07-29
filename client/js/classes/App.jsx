// App component - represents the whole app
App = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    let currentUser;
    const 
      subscription = Meteor.subscribe("userData"),
      subReady = subscription.ready();
    if (subReady) {
      currentUser = Meteor.user();
    };

    return {
      subReady: subReady,
      currentUser: currentUser,
      signedIn: Meteor.user() != null
    }
  },
  render() {
    var user_tpl, username;
    if(this.data.currentUser){
      username = this.data.currentUser.username || this.data.currentUser.services.facebook.name;
      user_tpl =  <li className="dropdown">
                    <a className="btn btn-default dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{username} <span className="caret"></span></a>
                    <ul className="dropdown-menu">
                      <li><a href="/logout">Salir</a></li>
                    </ul>
                  </li>
    }else{
      user_tpl = <a className="btn btn-default" role="button" href="/login">Entrar</a>
    }
    return  <div>
              <nav className="navbar navbar-default navbar-static-top">  
                <div className="container-fluid"> 
                  <div className="navbar-header"> 
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-8" aria-expanded="false"> 
                      <span className="sr-only">Toggle navigation</span> 
                      <span className="icon-bar"></span> 
                      <span className="icon-bar"></span> 
                      <span className="icon-bar"></span> 
                    </button> 
                    <a className="navbar-brand" href="#">Brand</a> 
                  </div>  
                  <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-8"> 
                    <ul className="nav navbar-nav"> 
                      <li className="active">
                        <a role="button" href="/calendar" >Calendario</a>
                      </li> 
                      <li className="dropdown">
                        <a className="btn btn-default dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Rutinas<span className="caret"></span></a>
                        <ul className="dropdown-menu">
                          <li><a href="/routines">Lista</a></li>
                          <li><a href="/routines/add">Crear Nueva</a></li>
                        </ul>
                      </li>
                      <li className="dropdown">
                        <a className="btn btn-default dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Rutinas<span className="caret"></span></a>
                        <ul className="dropdown-menu">
                          <li><a href="/exercises">Ejercicios</a></li>
                          <li><a href="/exercises/add">Crear Ejercicio</a></li>
                        </ul>
                      </li>
                      {user_tpl}
                    </ul> 
                  </div> 
                </div> 
              </nav>
              <div id="render-target"></div>
            </div>;
  }
});