
SessionList = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData() {
		Meteor.subscribe("sessions");

	    return {
	      sessions: Sessions.find({}, { sort: { createdAt: -1 } }).fetch(),
	    };
	},
	componentDidMount() {
	},
	render() {
	    return <div>
	    			<h1>Ultimas Sesiones</h1>
	                {this.data.sessions.map(function(object, i){
			            return <div className="list-group" key={object._id}>
								  	<a href={'/sessions/'+object._id} className="list-group-item active">
								    	<h4 className="list-group-item-heading">Sesion 14/06/2016</h4>
								    	<p className="list-group-item-text">{object.objective}</p>
								  	</a>
								</div>
			        })}
	            </div>;
	}
});
