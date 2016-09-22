

var {
    Avatar
    } = MUI;

var {SvgIcons} = MUI.Libs;

UserCard = React.createClass({
  render() {
    // Just render a placeholder container that will be filled in
    return  <Avatar
                src="images/uxceo-128.jpg"
                size={30}
            >
              {{title}}
            </Avatar>;
  }
});