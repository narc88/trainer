var WEEKDAYS = [
	{'value':0, 'label':'Domingo'},
	{'value':1 , 'label':'Lunes'},
	{'value':2 , 'label':'Martes'},
	{'value':3 , 'label':'Miércoles'},
	{'value':4 , 'label':'Jueves'},
	{'value':5 , 'label':'Viernes'},
	{'value':6 , 'label':'Sábado'}
]

var {
    CardTitle,
    CardHeader,
    CardMedia,
    CardText,
    Card,
    Chip
    } = MUI;


var {SvgIcons} = MUI.Libs;

UserProfile = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData() {
		let subscription = Meteor.subscribe("users");
		let turns_subscription = Meteor.subscribe("turns");
		let sessions_subscription = Meteor.subscribe("sessions");
		let routines_subscription = Meteor.subscribe("routines");
		let clients_subscription = Meteor.subscribe("clients");
	    return {
	    	isLoading: !subscription.ready(),
	      	client: Clients.find({ _id : this.props.id}, { sort: { createdAt: -1 } }).fetch()[0] || {},
	      	user: Meteor.users.find({ client : this.props.id}, { sort: { createdAt: -1 } }).fetch()[0] || {},
	      	turns: Turns.find({ client : this.props.id}, { sort: { createdAt: -1 } }).fetch() || {},
	      	sessions: Sessions.find({ client : this.props.id}, { sort: { createdAt: -1 } }).fetch() || {},
	      	routines: Routines.find({ client : this.props.id}, { sort: { createdAt: -1 } }).fetch() || {},
	    };
	},
	handleRequestDelete(id){
	  	Meteor.call('removeTurn', id, function (error, result) {});
	},
	render() {
		var template = '';
		var weekday = '';
		if(!this.data.isLoading){
	      	template = 	<Card>
						    <CardHeader
							    title={this.data.client.name} subtitle={this.data.client.age+' Años'}
							    avatar="http://res.cloudinary.com/db6uq4jy9/image/upload/v1466101331/c2w7b99g3o21chn5bmxb.jpg"
						    />
						    <CardTitle title={this.data.client.name} subtitle={this.data.client.description} />
						    <CardText>
							    {this.data.turns.map(function(object, i){
							    	weekday = this.props.turn.day;
						            return 	<Chip onRequestDelete={() => this.handleRequestDelete(object._id)}>
						            			{lodash.find(WEEKDAYS, function(o) { return o.value == weekday; }).label} - {object.hour}:{object.minute}
						            		</Chip>
						        })}
							    {this.data.client.name}
						    </CardText>
					  	</Card>;
	    }else{
	    	template = 	<Loading/>
	    }
	    return template;
	}
});