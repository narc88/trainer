
Calendar = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    let turns_subscription = Meteor.subscribe("turns");
    return {
      isLoading: !turns_subscription.ready(),
      turns: Turns.find({}, { sort: { createdAt: -1 } }).fetch() || {}
    };
  },
  componentDidMount() {
    var self = this;
    self.view = Blaze.render(Template.CalendarTemplate,
    ReactDOM.findDOMNode(self.refs.container));   
  },
  componentWillUnmount() {
    Blaze.remove(this.view);
  },
  render() {
    // Just render a placeholder container that will be filled in
    return <span ref="container" />;
  }
})
