
GymsList = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData() {
		let subscription = Meteor.subscribe("gyms");

	    return {
	    	isLoading: !subscription.ready(),
	      	gyms: Gyms.find({}, { sort: { createdAt: -1 } }).fetch(),
	    };
	},
	componentDidMount() {
	},
	render() {
	    return <div>
	    			<h1>Gimnasios</h1>
	    			<ul class="list-group">
		                {this.data.gyms.map(function(object, i){
				            return <GymsListItem gym={object} key={object._id}/>
				        })}
			        </ul>
	            </div>;
	}
});
