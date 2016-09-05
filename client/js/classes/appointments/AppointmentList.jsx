var WEEKDAYS = [
	{'value':0, 'label':'Domingo'},
	{'value':1 , 'label':'Lunes'},
	{'value':2 , 'label':'Martes'},
	{'value':3 , 'label':'Miércoles'},
	{'value':4 , 'label':'Jueves'},
	{'value':5 , 'label':'Viernes'},
	{'value':6 , 'label':'Sábado'}
]

AppointmentList = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData() {
		let subscription = Meteor.subscribe("allAppointments");

	    return {
	    	isLoading: !subscription.ready(),
	      	appointments: Appointments.find({}, { sort: { createdAt: -1 } }).fetch(),
	    };
	},
	componentDidMount() {
	},
	render() {
	    return <div>
	    			<h1>Appointments</h1>
	    			<ul class="list-group">
		                {this.data.appointments.map(function(object, i){
				            return <Appointment appointment={object} key={object._id}/>
				        })}
			        </ul>
	            </div>;
	}
});
