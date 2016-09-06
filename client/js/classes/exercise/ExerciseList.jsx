
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
	    return 	<MobileTearSheet>
				    <List>
				      	<Subheader inset={true}>Ejercicios</Subheader>
				      	{this.data.exercises.map(function(object, i){
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
