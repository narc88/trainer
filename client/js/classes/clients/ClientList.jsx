ClientList = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData() {
		let subscription = Meteor.subscribe("clients");

	    return {
	    	isLoading: !subscription.ready(),
	      	clients: Clients.find({}, { sort: { createdAt: -1 } }).fetch(),
	    };
	},
	componentDidMount() {
	},
	render() {
	    return <div>
	    			<h1>Alumnos</h1>
	    			<ul class="list-group">
		                {this.data.clients.map(function(object, i){
				            return <Client client={object} key={object._id}/>
				        })}
			        </ul>
	            </div>;
	}
});
