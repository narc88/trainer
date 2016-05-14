
Calendar = React.createClass({
  componentDidMount() {
    this.view = Blaze.render(Template.CalendarTemplate,
      React.findDOMNode(this.refs.container));
  },
  componentWillUnmount() {
    Blaze.remove(this.view);
  },
  render() {
    // Just render a placeholder container that will be filled in
    return <span ref="container" />;
  }
})
