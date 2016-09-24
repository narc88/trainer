
var {
    List,
    ListItem,
    Avatar,
    ActionInfo,
    Menu,
    MenuItem,
    Divider,
    IconButton,
    IconMenu
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
        console.log('Moving to'+e);
        FlowRouter.go('/exercises/'+e);
    },
	componentDidMount() {
	},
	render() {
		var _onListItemSelected = this._onListItemSelected;
	    return 	<div>
				    <List>
				      	{this.data.exercises.map(function(object, i){
				      		return <ListItem
								        leftAvatar={<Avatar onTouchTap={() => _onListItemSelected(object._id)} src='http://res.cloudinary.com/db6uq4jy9/image/upload/v1466101331/c2w7b99g3o21chn5bmxb.jpg' />}
								        rightIcon={<IconMenu
												      iconButtonElement={<IconButton><SvgIcons.ActionInfo /></IconButton>}
												      anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
												      targetOrigin={{horizontal: 'left', vertical: 'bottom'}}
												    >
												      	<MenuItem primaryText="Eliminar" />
												      	<MenuItem primaryText="Editar" />
												    </IconMenu>}
								        primaryText={object.name}
								        secondaryText={object.description}
								    >
								    </ListItem>
			        	})}
				    </List>
				</div>;
	}
});
