
PlayRoutine = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      session: Session.get('session') || {}
    };
  },
  componentDidMount() {
    this.getRoutine();
  },
  getRoutine() {
    let id = undefined;
    Meteor.call('getRoutine', id ,function(error, result){
      Session.set('routine', result);
    });
  },
 
  render() {
    return <div>
                <header className="jumbotron">
                    <h3>{this.data.session.name}</h3>
                    <div>{this.data.session.purpose}</div>
                    <div>{this.data.session.objective}</div>
                </header>
                <PlaySessionExercise></PlaySessionExercise>
            </div>;
  }
});
