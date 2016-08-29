
UserProfile = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData() {
		let subscription = Meteor.subscribe("users");
		let turns_subscription = Meteor.subscribe("turns");
		let sessions_subscription = Meteor.subscribe("sessions");
		let routines_subscription = Meteor.subscribe("routines");
	    return {
	    	isLoading: !subscription.ready(),
	      	client: Meteor.client.find({ _id : this.props.id}, { sort: { createdAt: -1 } }).fetch()[0] || {},
	      	user: Meteor.users.find({ client : this.props.id}, { sort: { createdAt: -1 } }).fetch()[0] || {},
	      	turns: Turns.find({ client : this.props.id}, { sort: { createdAt: -1 } }).fetch() || {},
	      	sessions: Sessions.find({ client : this.props.id}, { sort: { createdAt: -1 } }).fetch() || {},
	      	routines: Routines.find({ client : this.props.id}, { sort: { createdAt: -1 } }).fetch() || {},
	    };
	},
	render() {
		var template = '';
		if(!this.data.isLoading){
	      	template = 	<div className="row">
						  	<div className="col-sm-12 col-md-12">
						    	<div className="thumbnail">
						      		<img src="http://res.cloudinary.com/db6uq4jy9/image/upload/v1466101331/c2w7b99g3o21chn5bmxb.jpg" alt="..."/>
						      		<div className="caption">
						        		<h3>Nombre de usuario</h3>
						        		<p>Asiste</p>
						        		<ul className="list-group">
							                {this.data.turns.map(function(object, i){
									            return <TurnItem turn={object} key={object._id}/>
									        })}
									        <li> 
									        	<a role="button" 
									        		data-toggle="collapse"  
									        		href="#collapseAppointmentForm" 
									        		aria-expanded="false" 
									        		aria-controls="collapseAppointmentForm">
									        		Agregar turno 
									        		<span className="glyphicon glyphicon-calendar"></span>
									        	</a>
									        	<div id="collapseAppointmentForm" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingAppointmentForm">
										      		<div className="panel-body">
										      			<TurnForm/>
										      		</div>
										    	</div>
									        </li>
									       
								        </ul>		
						        		<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
											<div class="panel panel-default">
										    	<div class="panel-heading" role="tab" id="headingRoutine">
										      		<h4 class="panel-title">
										        		<a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseRoutine" aria-expanded="false" aria-controls="collapseRoutine">
										          			Rutinas
										        		</a>
										      		</h4>
										    	</div>
										    	<div id="collapseRoutine" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingRoutine">
										      		<div class="panel-body">
										      		</div>
										    	</div>
										  	</div>
										  	<div class="panel panel-default">
										    	<div class="panel-heading" role="tab" id="headingSession">
										      		<h4 class="panel-title">
										        		<a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseSession" aria-expanded="false" aria-controls="collapseSession">
										          			Ultimas Sesiones
										        		</a>
										      		</h4>
										    	</div>
										    	<div id="collapseSession" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingSession">
										      		<div class="panel-body">
										      		</div>
										    	</div>
										  	</div>
										  	<div class="panel panel-default">
										    	<div class="panel-heading" role="tab" id="headingExplanation">
										      		<h4 class="panel-title">
										        		<a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseExplanation" aria-expanded="false" aria-controls="collapseExplanation">
										          			Consejos
										        		</a>
										      		</h4>
										    	</div>
										    	<div id="collapseExplanation" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingExplanation">
										      		<div class="panel-body">
										        		{this.data.user.tips}
										      		</div>
										    	</div>
										  	</div>
										</div>
						      		</div>
						    	</div>
						  	</div>
						</div>;
	    }else{
	    	template = 	<Loading/>
	    }
	    return template;
	}
});