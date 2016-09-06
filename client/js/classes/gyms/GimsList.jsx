
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
	    return 	<MobileTearSheet>
				    <List>
				      	<Subheader inset={true}>Gimnasios</Subheader>
				      	{this.data.gyms.map(function(object, i){
				      		return <ListItem
								        leftAvatar={<Avatar icon={<FileFolder />} />}
								        rightIcon={<ActionInfo />}
								        primaryText={object.name}
								        secondaryText={object.description}
								    />
			        	})}
				    </List>
				</MobileTearSheet>;
	}
});
