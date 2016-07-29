var EXERCISE_TYPES = [
	{'value':'repetitions', 'label':'Repeticiones'},
	{'value':'staggered', 'label':'Repeticiones Escalonadas'},
	{'value':'timed', 'label':'Tiempo'},
	{'value':'circuit', 'label':'Circuito'}
]

RoutineExerciseForm = React.createClass({
	getInitialState() {
		return {
				errors: {},
				data: this.props.exercise
				}
  	},
  	componentDidMount() {
  		
	},
  	isValid() {
  		/*Validation needs to be changed
		var fields = ['name', 'tags', 'description', 'type']
		var errors = {}
		fields.forEach(function(field) {
			var value = trim(this.refs[field].value)
			if (!value) {
				errors[field] = 'Este campo es necesario';
	 		}
		}.bind(this));
		this.setState({errors: errors})

		var isValid = true;
		for (var error in errors) {
	 		isValid = false;
	  		break;
		}
		*/
		var isValid = true;
		return isValid;
  	} ,
  	handleSubmit(event) {
	  	event.preventDefault();
	  	let exercise = lodash.extend(this.props.exercise , this.getFormData());
	  	if(this.isValid()){
	  		this.props.updateRoutineExercise(exercise)
	  	}
  	},
  	changeType(){
  		var data = this.getFormData();
  		this.setState({
  			data: data
  		});
  	},
  	getFormData() {
  		var repetitions = this.refs.repetitions? this.refs.repetitions.value : '';
  		var duration = this.refs.duration? this.refs.duration.value : '';
  		var cant_exercises =this.refs.cant_exercises? this.refs.cant_exercises.value : '';
  		var series =this.refs.series? this.refs.series.value : '';
		return {
				series: series,
				repetitions: repetitions,
				duration: duration,
				cant_exercises: cant_exercises,
				rest:this.refs.rest.value 
			};
  	},
  	render() {
  		var repetitions_container = '';
  		var series_container = '';
  		if(this.state.data.type){
	  		switch(this.state.data.type){
	  			case 'repetitions':
	  				repetitions_container = this.renderNumberInput('repetitions', 'Repeticiones');
	  				series_container = this.renderNumberInput('series', 'Series');
	  				break;
	  			case 'timed':
	  				repetitions_container = this.renderNumberInput('duration', 'Duración (segs)');
	  				series_container = this.renderNumberInput('series', 'Series');
	  				break;
	  			case 'circuit':
	  				repetitions_container = this.renderNumberInput('cant_exercises', 'Cantidad de ejercicios');
	  				break;
	  			case 'staggered':
	  				repetitions_container = this.renderTextInput('staggered', 'Cantidad de Repeticiones por serie');
	  				break;
	  		}
	  	}
		return <div className="form-horizontal">
					<form onSubmit={this.handleSubmit} ref="exerciseForm">
						{this.renderSelect('type', 'Tipo', EXERCISE_TYPES)}
						{series_container}
						{repetitions_container}
						{this.renderNumberInput('rest', 'Descanso (Segundos)')}
						<button type="submit">Guardar</button>
					</form>
			</div>;
  	}, 
  	renderTextInput(id, label) {
		return this.renderField(id,
								label,
								<input type="text" className="form-control" defaultValue={this.props.exercise[id]} id={id} ref={id}/>
								);
  	},
  	renderNumberInput(id, label) {
		return this.renderField(id,
								label,
								<input type="number" pattern="[0-9]*" className="form-control" defaultValue={this.props.exercise[id]} id={id} ref={id}/>
								);
  	},
	renderSelect(id, label, values) {
		var changeType = this.changeType;
		var options = values.map(function(value) {
		 	return <option key={value.value} value={value.value}>{value.label}</option>
		})
		return this.renderField(id, label,
				  <select className="form-control" onChange={changeType} key={id}  id={id} ref={id}>
					{options}
				  </select>
				);
	},
  	renderField(id, label, field) {
		return <div className={classNames('form-group', 'form-group-sm','col-xs-6', 'col-sm-6', 'col-md-6' , {'has-error': id in this.state.errors})}>
					<label htmlFor={id} className="col-sm-4 control-label">{label}</label>
					<div className="col-sm-6">
						{field}
					</div>
				</div>;
	}
})


// Utils

function trim(string) {
  var TRIM_RE = /^\s+|\s+$/g
  return string.replace(TRIM_RE, '');
}