
UserList = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData() {
		let subscription = Meteor.subscribe("users");

	    return {
	    	isLoading: !subscription.ready(),
	      	users: Meteor.users.find({}, { sort: { createdAt: -1 } }).fetch(),
	    };
	},
	componentDidMount() {
	},
	render() {
	    return <div>
	    			<h1>Usuarios</h1>
	    			<ul className="list-group">
		                {this.data.users.map(function(object, i){
				            return <UserListItem user={object} key={object._id}/>
				        })}
			        </ul>
	            </div>;
	}
});
