

var {
    Avatar
    } = MUI;

var {SvgIcons} = MUI.Libs;

UserCard = React.createClass({
  render() {
    // Just render a placeholder container that will be filled in
    return  <Avatar
                size={30}
            >
              {this.props.title}
            </Avatar>;
  }
});

