var OBJECTIVES = [
	{'value':'rehab', 'label':'Rehabilitación'},
	{'value':'sport_train', 'label':'Entrenamiento deportivo'},
	{'value':'flexibility', 'label':'Flexibilidad'},
	{'value':'lower_weight', 'label':'Bajar de peso'},
	{'value':'power', 'label':'Potencia'}
]

var CATEGORIES = [
	'Zona Media',
	'Biceps',
	'Tren Inferior',
	'Coordinativo',
	'Activador'
]

var EXERCISE_TYPES = [
	{'value':'repetitions', 'label':'Repeticiones'},
	{'value':'staggered', 'label':'Repeticiones Escalonadas'},
	{'value':'timed', 'label':'Tiempo'},
	{'value':'circuit', 'label':'Circuito'}
]

ExerciseForm = React.createClass({
	getInitialState() {
		return {
				errors: {},
				data: {}
				}
  	},
  	componentDidMount() {
  		var categories = new Bloodhound({
		    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
		    queryTokenizer: Bloodhound.tokenizers.whitespace,
		    local: $.map(CATEGORIES, function (city) {
		        return {
		            name: city
		        };
		    })
		});
		categories.initialize();
  		$('#tags').tagsinput({
		    typeaheadjs: [{
		        minLength: 3,
		        highlight: true,
		    },{
		        minlength: 3,
		        name: 'categories',
		        displayKey: 'name',
		        valueKey: 'name',
		        source: categories.ttAdapter()
		    }],
		    freeInput: true
		});
	},
  	isValid() {
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
		return isValid;
  	} ,
  	handleSubmit(event) {
	  	event.preventDefault();
	  	let exercise = this.getFormData();
	  	if(this.isValid()){
	  		Meteor.call('addExercise', exercise, function (error, result) {

	  		 	FlowRouter.redirect('/exercises');
	  		});
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
				//Categoría, duracion, series... Se llenan cuando armas la rutina.
			  	name: this.refs.name.value,
			  	tags: this.refs.tags.value,
			  	description: this.refs.description.value,
				tips: this.refs.tips.value,
				totalSeries: series,
				series: [],
				type: this.refs.type.value,
				explanation: this.refs.explanation.value,
				repetitions: repetitions,
				duration: duration,
				rest:this.refs.rest.value,
				cant_exercises: cant_exercises
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
						{this.renderTextInput('name', 'Nombre')}
						{this.renderSelect('type', 'Tipo', EXERCISE_TYPES)}
						{series_container}
						{repetitions_container}
						{this.renderNumberInput('rest', 'Descanso (Segundos)')}
						{this.renderTextarea('description', 'Descripción')}
						{this.renderTextarea('explanation', 'Explicación')}
						{this.renderTagInput('tags', 'Categorías')}
						{this.renderTextarea('tips', 'Tips para realizar el ejercicio')}
						<button type="submit">Guardar</button>
					</form>
			</div>;
  	}, 
  	renderTextInput(id, label) {
		return this.renderField(id,
								label,
								<input type="text" className="form-control" id={id} ref={id}/>
								);
  	},
  	renderNumberInput(id, label) {
		return this.renderField(id,
								label,
								<input type="number" pattern="[0-9]*" className="form-control" id={id} ref={id}/>
								);
  	},
   	renderTextarea(id, label) {
		return this.renderField(id, label,
								  <textarea className="form-control" id={id} ref={id}/>
								);
  	},
  	renderTagInput(id, label) {
		return this.renderField(id, label,
							  		<input type="text" placeholder="Categorias del ejercicio" name={id} id={id} ref={id}  data-role="tagsinput" />
								);
  	},
 	renderFileInput(id, label) {
		return this.renderField(id, label,
	  								<input type="file" name={id} id={id} ref={id} accept="image/*" />
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
	renderDateTime(id, label){
		var datetimeid = 'datetimepicker'+id;
		setTimeout(function(){
		  	$('#'+datetimeid).datetimepicker();
		},500);
	
		return this.renderField(id, label, 
								<div className="input-group date" id={datetimeid}>
								  	<input type="text" id={id} className="form-control" />  
								  	<span className="input-group-addon">
										<span className="glyphicon-calendar glyphicon"></span>
								 	</span>
								</div>);
	},
	renderRadioInlines(id, label, kwargs) {
		var radios = kwargs.values.map(function(value) {
			var defaultChecked = (value == kwargs.defaultCheckedValue)
			return 	<label className="radio-inline">
					  <input type="radio" ref={id + value} name={id} value={value} defaultChecked={defaultChecked}/>
					  <span>{value}</span>
					</label>
		})
		return this.renderField(id, label, radios);
  	},
  	renderField(id, label, field) {
		return <div className={aaac('form-group', {'has-error': id in this.state.errors})}>
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

function aaac(staticClassName, conditionalClassNames) {
  var classNames = []
  if (typeof conditionalClassNames == 'undefined') {
	conditionalClassNames = staticClassName
  }
  else {
	classNames.push(staticClassName)
  }
  for (var className in conditionalClassNames) {
	if (!!conditionalClassNames[className]) {
	  classNames.push(className)
	}
  }
  return classNames.join(' ')
}