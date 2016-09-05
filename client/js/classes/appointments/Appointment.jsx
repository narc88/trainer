var WEEKDAYS = [
	{'value':0, 'label':'Domingo'},
	{'value':1 , 'label':'Lunes'},
	{'value':2 , 'label':'Martes'},
	{'value':3 , 'label':'Miércoles'},
	{'value':4 , 'label':'Jueves'},
	{'value':5 , 'label':'Viernes'},
	{'value':6 , 'label':'Sábado'}
]

Appointment = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData() {
		if( this.props.appointmentId){
			let subscription = Meteor.subscribe("appointments");
		    return {
		    	isLoading: !subscription.ready(),
		      	appointment: Appointments.find({ _id : this.props.appointmentId}, { sort: { createdAt: -1 } }).fetch()[0] || {},
		    };
		}
	},
	remove(){
	  	Meteor.call('removeAppointment', this.props.appointment, function (error, result) {});
	},
	render() {
		if(this.props.appointment){
			var weekday = this.props.appointment.day;
		    return	<li className="list-group-item">
		    			<span>{lodash.find(WEEKDAYS, function(o) { return o.value == weekday; }).label} - {this.props.appointment.hour}:{this.props.appointment.minute}</span>
			        	<span className="glyphicon glyphicon-remove" ng-click={this.remove()}></span>
			        </li>;
		}else if(this.data.appointment){
			var weekday = this.data.appointment.day;
		    return	<li className="list-group-item">
		    			<span>{lodash.find(WEEKDAYS, function(o) { return o.value == weekday; }).label} - {this.data.appointment.hour}:{this.data.appointment.minute}</span>
			        	<span className="glyphicon glyphicon-remove" ng-click={this.remove()}></span>
			        </li>;
		}
	
	}
});