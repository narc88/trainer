Client = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData() {
		if( this.props.clientId){
			let subscription = Meteor.subscribe("clients");
		    return {
		    	isLoading: !subscription.ready(),
		      	client: Clients.find({ _id : this.props.clientId}, { sort: { createdAt: -1 } }).fetch()[0] || {},
		    };
		}
	},
	remove(){
	  	Meteor.call('removeClient', this.props.client, function (error, result) {});
	},
	render() {
	    return	<li className="list-group-item">
	    			<span>{this.props.client.name}</span>
	    			<span>{this.props.client.birthDate}</span>
	    			<span>{this.props.client.bloodType}</span>
		        	<span className="glyphicon glyphicon-remove" ng-click={this.remove()}></span>
		        </li>;
		
	}
});