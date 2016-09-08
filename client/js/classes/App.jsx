
injectTapEventPlugin();

var {
    DropDownMenu,
    MenuItem,
    AppBar,
    IconMenu,
    IconButton,
    NavigationClose,
    linkButton,
    Link
    } = MUI;

var {SvgIcons} = MUI.Libs;

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

  handleChange(event, index, value){
    console.log(value)
    console.log(event)
    this.setState({value});
  },
  getInitialState() {
    return {
      errors: {},
      menuTitle: 'Home',
      menu: '/calendar'
    }
  },
  render() {
    var user_tpl1, user_tpl2, user_tpl3, username;
    if(this.data.currentUser){
      username = this.data.currentUser.username || this.data.currentUser.services.facebook.name;
      user_tpl1 = <MenuItem linkButton
                    href={'/users/'+ Meteor.userId()} 
                    label="Perfil" 
                    primaryText="Perfil" />;
      user_tpl2 = <MenuItem linkButton
                    href={'/users/' + Meteor.userId() + '/gym'} 
                    label="Mi Gimnasio" 
                    primaryText="Mi Gimnasio" />;
      user_tpl3 = <MenuItem linkButton
                    href='/logout' 
                    label="Menu" 
                    primaryText="Salir" />;
    }else{
      user_tpl1 = <MenuItem linkButton
                    href={'/login'} 
                    label="Entrar" 
                    primaryText="Entrar" />;
      user_tpl2 = <MenuItem linkButton
                    href={'/register'} 
                    label="Registrarse" 
                    primaryText="Registrarse" />;
    }
    return  <div>
              <AppBar
                title={this.state.menuTitle}
                iconElementLeft={<IconButton><SvgIcons.NavigationClose /></IconButton>}
                iconElementRight={
                  <IconMenu
                    iconButtonElement={
                      <IconButton><SvgIcons.NavigationMoreVert /></IconButton>
                    }
                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                    onTouchTap={this.handleChange}
                  >
                    <MenuItem linkButton
                      href='/calendar' 
                      label="Calendario" 
                      primaryText="Calendario" />
                    <MenuItem linkButton
                      href='/routines' 
                      label="Rutinas" 
                      primaryText="Rutinas" />
                    <MenuItem linkButton
                      href='/exercises' 
                      label="Ejercicios" 
                      primaryText="Ejercicios" />
                    <MenuItem linkButton
                      href='/gyms' 
                      label="Gimnasios" 
                      primaryText="Gimnasios" />
                    <MenuItem linkButton
                      href='/clients' 
                      label="Alumnos" 
                      primaryText="Alumnos" />
                    <MenuItem linkButton
                      href='/turnos' 
                      label="Turnos" 
                      primaryText="Turnos" />
                    {user_tpl1}
                    {user_tpl2}
                    {user_tpl3}
                  </IconMenu>
                }
              />  
              <div id="render-target"></div>
            </div>;
  }
});