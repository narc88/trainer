
RoutineList = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData() {
		let subscription = Meteor.subscribe("routines");

	    return {
	    	isLoading: !subscription.ready(),
	      	routines: Routines.find({}, { sort: { createdAt: -1 } }).fetch(),
	    };
	},
	componentDidMount() {
	},
	render() {
	    return <div>
	    			<h1>Rutinas</h1>
	    			<ul class="list-group">
		                {this.data.routines.map(function(object, i){
				            return <RoutineListItem routine={object} key={object._id}/>
				        })}
			        </ul>
	            </div>;
	}
});
