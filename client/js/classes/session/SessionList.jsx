
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
								  	<div href={'/sessions/'+object._id} className="list-group-item">
								    	<h4 className="list-group-item-heading">Sesion {object.datetime}</h4>
								    	<p className="list-group-item-text">
								    		<span className="collapsed" data-toggle="collapse" data-target={'#expand'+object._id} aria-expanded="false" aria-controls={'expand'+object._id}>{object.objective}</span>
								    		<div className="collapse in" id={'expand'+object._id}>
												<div className="well">
											    	<span>
										    			<a href={'/sessions/'+object._id}>
											    			<button className="btn btn-primary">
											    				<span className="glyphicon glyphicon-list"></span>
											    			</button>
											    		</a>
										    		</span>
										    		<span>
										    			<a href={'/playSession/'+object._id}>
											    			<button className="btn btn-primary">
											    				<span className="glyphicon glyphicon-play-circle"></span>
											    			</button>
											    		</a>
										    		</span>
										    		<span>
										    			<button onClick={this.removeSession} className="btn btn-primary">
										    				<span className="glyphicon glyphicon-play-circle"></span>
										    			</button>
										    		</span>
										    		<span>
										    			<button onClick={this.editSession} className="btn btn-primary ">
										    				<span className="glyphicon glyphicon-play-circle"></span>
										    			</button>
										    		</span>	
											  	</div>
											</div>
								    	</p>
								  	</div>
								</div>
			        })}
	            </div>;
	}
});
