
Exercise = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData() {
		let subscription = Meteor.subscribe("exercises");
	    return {
	    	isLoading: !subscription.ready(),
	      	exercise: Exercises.find({ _id : this.props.id}, { sort: { createdAt: -1 } }).fetch()[0] || {},
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
						        		<h3>{this.data.exercise.name}</h3>
						        		<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
											<div class="panel panel-default">
										    	<div class="panel-heading" role="tab" id="headingDescription">
										      		<h4 class="panel-title">
										        		<a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseDesc" aria-expanded="false" aria-controls="collapseDesc">
										          			Descripción
										        		</a>
										      		</h4>
										    	</div>
										    	<div id="collapseDesc" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingDescription">
										      		<div class="panel-body">
										        		{this.data.exercise.description}
										      		</div>
										    	</div>
										  	</div>
										  	<div class="panel panel-default">
										    	<div class="panel-heading" role="tab" id="headingExplanation">
										      		<h4 class="panel-title">
										        		<a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseExplanation" aria-expanded="false" aria-controls="collapseExplanation">
										          			Explicación
										        		</a>
										      		</h4>
										    	</div>
										    	<div id="collapseExplanation" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingExplanation">
										      		<div class="panel-body">
										        		{this.data.exercise.explanation}
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
										        		{this.data.exercise.tips}
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