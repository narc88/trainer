
var placeholder = document.createElement("li");
placeholder.className = "placeholder";

RoutineExercise = React.createClass({
	
	render() {
		var series_btn , repetitions_btn , rest_btn;
		
		if(this.props.exercise.series > 1){
			series_btn =<button type="button" className="btn btn-info"  data-toggle="modal" data-target={'#formFor'+this.props.exercise._id} aria-expanded="false" aria-controls={'formFor'+this.props.i}>
							<span className="glyphicon glyphicon-repeat"></span>
							<span className="">{this.props.exercise.series}</span>
						</button>;
		}

		if(this.props.exercise.type === 'repetitions' && this.props.exercise.repetitions){
			//Puede haber variaciones en las repeticiones
			repetitions_btn =<button type="button" className="btn btn-success"  data-toggle="modal" data-target={'#formFor'+this.props.exercise._id} aria-expanded="false" aria-controls={'formFor'+this.props.exercise._id}>
								<span className="glyphicon glyphicon-refresh"></span>
								<span className="">{this.props.exercise.repetitions}</span>
							</button>;
		}else if (this.props.exercise.type !== 'timed' && this.props.exercise.series && !this.props.exercise.repetitions){
			var repetitions = [];
			for (var i = 0; i < this.props.exercise.series.length; i++) {
				repetitions.push( this.props.exercise.series[i].repetitions);
			}
			repetitions_btn =<button type="button" className="btn btn-success"  data-toggle="modal" data-target={'#formFor'+this.props.exercise._id} aria-expanded="false" aria-controls={'formFor'+this.props.exercise._id}>
								<span className="glyphicon glyphicon-refresh"></span>
								<span className="">{repetitions}</span>
							</button>;
		}else if(this.props.exercise.type === 'timed'){
			repetitions_btn =<button type="button" className="btn btn-success"  data-toggle="modal" data-target={'#formFor'+this.props.exercise._id} aria-expanded="false" aria-controls={'formFor'+this.props.exercise._id}>
								<span className="glyphicon glyphicon-hourglass"></span>
								<span className="">{this.props.exercise.duration}´´</span>
							</button>;
		}

		if(this.props.exercise.rest){
			rest_btn =<button type="button" className="btn btn-danger"  data-toggle="modal" data-target={'#formFor'+this.props.exercise._id} aria-expanded="false" aria-controls={'formFor'+this.props.exercise._id}>
							<span className="glyphicon glyphicon-pause"></span>
							<span className="">{this.props.exercise.rest+'´´'}</span>
						</button>;
		}

	    return 	<li className="list-group-item clickable col-xs-12 col-sm-12 col-md-12"
		        	data-id = {this.props.i}
		            key = {this.props.i}
		            draggable = "true"
		            onDragEnd = {this.props.dragEnd}
		            onDragStart = {this.props.dragStart}>
		            <div className="col-xs-12 col-sm-12 col-md-12">
		    			<div className="media col-xs-8 col-sm-8 col-md-8">
							<div className="media-body">
							    <h4 className="media-heading">{this.props.exercise.name}</h4>
							    {this.props.exercise.description}
							</div>
			            </div>
			            <div className="col-xs-4 col-sm-4 col-md-4 ">
							<div className="btn-group-vertical pull-right" role="group">
							  	{series_btn}
							  	{repetitions_btn}
							  	{rest_btn}
							</div>
			            </div>
			        </div>
			        <div className="modal fade" id={'formFor'+this.props.exercise._id} tabindex="-1" role="dialog" aria-labelledby={'formFor'+this.props.exercise._id+'label'}>
					 	<div className="modal-dialog" role="document">
					   		<div className="modal-content">
					      		<div className="modal-header">
					        		<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					        		<h4 className="modal-title" id={'formFor'+this.props.exercise._id+'label'}>Editar ejercicio</h4>
					      		</div>
					      	<div className="modal-body">
					        	<RoutineExerciseForm exercise={this.props.exercise} updateRoutineExercise={this.props.updateExercise}/>
					      	</div>
					      	<div className="modal-footer">
					       		<button type="button" className="btn btn-default" data-dismiss="modal">Cerrar</button>
					        	<button type="button" className="btn btn-primary">Guardar</button>
					      	</div>
					    </div>
					  </div>
					</div>
		        </li>;
	}
});
