
ExerciseList = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData() {
		let subscription = Meteor.subscribe("exercises");

	    return {
	    	isLoading: !subscription.ready(),
	      	exercises: Exercises.find({}, { sort: { createdAt: -1 } }).fetch(),
	    };
	},
	componentDidMount() {
	},
	render() {
	    return <div>
	    			<h1>Ejercicios</h1>
	                {this.data.exercises.map(function(object, i){
			            return <ExerciseItem exercise={object} />
			        })}
	            </div>;
	}
});
