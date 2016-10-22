
injectTapEventPlugin();

var {
    DropDownMenu,
    MenuItem,
    AppBar,
    IconMenu,
    IconButton,
    NavigationClose,
    linkButton,
    Link,
    LeftNav,
    Menu
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
  toggleDrawer(){
    this.setState({open: !this.state.open});
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
      menu: '/calendar',
      open:false
    }
  },
  closeNavigationMenu(){
    this.setState({open:false});
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
                iconElementLeft={<IconButton
                                    onTouchTap={this.toggleDrawer}
                                  >
                                    <SvgIcons.ImageDehaze />
                                  </IconButton>}
                iconElementRight={
                  <IconMenu
                    iconButtonElement={
                      <IconButton ><SvgIcons.NavigationMoreVert /></IconButton>
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
                      href='/turns' 
                      label="Turnos" 
                      primaryText="Turnos" />
                    <MenuItem linkButton
                      href='/clients' 
                      label="Alumnos" 
                      primaryText="Alumnos" />
                    {user_tpl1}
                    {user_tpl2}
                    {user_tpl3}
                  </IconMenu>
                }
              /> 
              <LeftNav
                docked={false}
                open={this.state.open}
                onRequestChange={(open) => this.setState({open})}
              > 
                <Menu autoWidth={true}>
                  <MenuItem 
                    primaryText="Inicio" 
                    linkButton
                    href='/home' 
                    label="Inicio"
                    insetChildren={true}
                    leftIcon={<SvgIcons.ActionHome />} />
                  <MenuItem 
                    primaryText="Alumnos"
                    label="Alumnos"
                    insetChildren={true}
                    rightIcon={<SvgIcons.NavigationArrowDropRight />}
                    leftIcon={<SvgIcons.ActionSupervisorAccount />} 
                    menuItems={[
                      <MenuItem 
                        primaryText="Lista" 
                        linkButton
                        href='/clients' 
                        label="Alumnos"
                        onTouchTap={this.closeNavigationMenu}
                        insetChildren={true}
                        leftIcon={<SvgIcons.ActionViewList />} />,
                      <MenuItem 
                        primaryText="Nuevo" 
                        linkButton
                        href='/clients/add' 
                        label="Nuevo"
                        onTouchTap={this.closeNavigationMenu}
                        insetChildren={true}
                        leftIcon={<SvgIcons.ContentAddCircle />} />,
                      <MenuItem 
                        primaryText="Lista" 
                        linkButton
                        href='/clients' 
                        label="Alumnos"
                        onTouchTap={this.closeNavigationMenu}
                        insetChildren={true}
                        leftIcon={<SvgIcons.ActionSupervisorAccount />} />
                    ]}
                  />
                  <MenuItem linkButton
                    href='/calendar' 
                    label="Calendario" 
                    primaryText="Calendario"
                    insetChildren={true}
                    leftIcon={<SvgIcons.ActionToday />} />
                  <MenuItem  
                    label="Ejercicios" 
                    primaryText="Ejercicios" 
                    insetChildren={true}
                    leftIcon={<SvgIcons.ActionAccessibility />}
                    rightIcon={<SvgIcons.NavigationArrowDropRight />}
                    menuItems={[
                      <MenuItem 
                        primaryText="Lista" 
                        linkButton
                        href='/exercises' 
                        label="Ejercicios"
                        insetChildren={true}
                        onTouchTap={this.closeNavigationMenu}
                        leftIcon={<SvgIcons.ActionViewList />} />,
                      <MenuItem 
                        primaryText="Nuevo" 
                        linkButton
                        href='/exercises/add' 
                        label="Nuevo"
                        insetChildren={true}
                        onTouchTap={this.closeNavigationMenu}
                        leftIcon={<SvgIcons.ContentAddCircle />} />
                    ]}
                  />
                  <MenuItem  
                    label="Rutinas" 
                    primaryText="Rutinas"
                    insetChildren={true}
                    rightIcon={<SvgIcons.NavigationArrowDropRight />}
                    leftIcon={<SvgIcons.ActionAssignment />} 
                    menuItems={[
                      <MenuItem 
                        primaryText="Lista" 
                        linkButton
                        href='/routines' 
                        label="Rutinas"
                        insetChildren={true}
                        onTouchTap={this.closeNavigationMenu}
                        leftIcon={<SvgIcons.ActionViewList />} />,
                      <MenuItem 
                        primaryText="Nueva" 
                        linkButton
                        href='/routines/add' 
                        label="Nueva"
                        insetChildren={true}
                        onTouchTap={this.closeNavigationMenu}
                        leftIcon={<SvgIcons.ContentAddCircle />} />
                    ]}
                  />
                </Menu>
              </LeftNav>
              <div id="render-target" refs="rootElement"></div>
            </div>;
  }
});