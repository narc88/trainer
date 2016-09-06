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
	    return 	<MobileTearSheet>
				    <List>
				      	<Subheader inset={true}>Alumnos</Subheader>
				      	{this.data.clients.map(function(object, i){
				      		return <ListItem
								        leftAvatar={<Avatar icon={<FileFolder />} />}
								        rightIcon={<ActionInfo />}
								        primaryText={object.name}
								        secondaryText={object.birthDate}
								    />
			        	})}
				    </List>
				</MobileTearSheet>;
	}
});
