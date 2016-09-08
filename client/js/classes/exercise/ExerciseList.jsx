
var {
    List,
    ListItem,
    Avatar,
    ActionInfo
    } = MUI;

var {SvgIcons} = MUI.Libs;

ExerciseList = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData() {
		let subscription = Meteor.subscribe("exercises");

	    return {
	    	isLoading: !subscription.ready(),
	      	exercises: Exercises.find({}, { sort: { createdAt: -1 } }).fetch(),
	    };
	},
	_onListItemSelected: function(e) {
        console.log(e);
    },
	componentDidMount() {
	},
	render() {
		var _onListItemSelected = this._onListItemSelected;
	    return 	<div>
				    <List>
				      	{this.data.exercises.map(function(object, i){
				      		return <ListItem
								        leftAvatar={<Avatar src='http://res.cloudinary.com/db6uq4jy9/image/upload/v1466101331/c2w7b99g3o21chn5bmxb.jpg' />}
								        rightIcon={<SvgIcons.ActionInfo />}
								        primaryText={object.name}
								        onTouchTap={() => _onListItemSelected(object._id)}
								        secondaryText={object.description}
								    />
			        	})}
				    </List>
				</div>;
	}
});
