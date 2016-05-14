
UserCard = React.createClass({
  componentDidMount() {
    this.view = Blaze.render(Template.UserCardTemplate,
      React.findDOMNode(this.refs.containerUserCard));
  },
  componentWillUnmount() {
    Blaze.remove(this.view);
  },
  render() {
    // Just render a placeholder container that will be filled in
    return  <span ref="containerUserCard" />;
  }
})

Hello = React.createClass({
    render() {
        return <this.props.component.slug className='text'>
            {this.props.component.value}
        </this.props.component.slug>;
    }
});

