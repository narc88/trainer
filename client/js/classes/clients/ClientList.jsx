
var {
    List,
    ListItem,
    Avatar,
    ActionInfo,
    FloatingActionButton,
    Card,
    Styles,
    Paper,
    FontIcon
    } = MUI;

var {SvgIcons} = MUI.Libs;

ClientList = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData() {
		let subscription = Meteor.subscribe("clients");

	    return {
	    	isLoading: !subscription.ready(),
	      	clients: Clients.find({}, { sort: { createdAt: -1 } }).fetch(),
	    };
	},
	_onListItemSelected: function(e) {
        console.log('Moving to'+e);
        FlowRouter.go('/clients/'+e);
    },
	componentDidMount() {
	},
	render() {
		var style = {
			  	marginRight: 20,
			}
		var _onListItemSelected = this._onListItemSelected;
	    return 	<div>
	    			<FloatingActionButton  mini={true} secondary={true} style={style}>
				      	<SvgIcons.ContentAdd />
				    </FloatingActionButton>
				    <List>
				      	{this.data.clients.map(function(object, i){
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
