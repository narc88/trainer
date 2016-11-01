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


var {
    Dialog,
    RaisedButton,
    FlatButton,
    Slider,
    Chip,
    MenuItem,
    SelectField
    } = MUI;

var {SvgIcons} = MUI.Libs;


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
  		let exercise = {
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
		}
  		this.setState({data : exercise})
		return exercise;
  	},
  	onTypeChange(data, index, value){
  		var data = this.state.data;
  		data.type = value;
  		this.updateSeries(data);
  	},
  	updateSeries( data ){
  		if(data.type === 'staggered'){
  			data.totalSeries = this.state.data.totalSeries || this.refs.series;
	    	let series = [];
  			for (var i = 0; i < data.totalSeries; i++) {
  				series[i] = {
					    		repetitions : 0
					    	}
  			}

  			data.series = series;
  		}
  		this.setState({
  			data: data
  		});
  	},
	submitExercises(exercises){
		var new_data = this.state.data;
  		new_data.series = exercises;
    	this.setState({data: new_data});
	},
	handleDurationChange(event, data){
  		var new_data = this.state.data;
  		new_data.duration = data;
    	this.setState({data: new_data});
  	},
  	handleRestChange(event, data){
  		var new_data = this.state.data;
  		new_data.rest = data;
    	this.setState({data: new_data});
  	},
  	handleRepetitionsChange(event, data){
  		var new_data = this.state.data;
  		new_data.repetitions = data;
    	this.setState({data: new_data});
  	},
  	handleSeriesChange(event, data){
  		var new_data = this.state.data;
  		new_data.totalSeries = data;
    	this.updateSeries( new_data );
  	},
  	handleSerieDataChange(data, index){
  		var new_data = this.state.data;
  		new_data.series[index].repetitions = data;
    	this.setState({data: new_data});
  	},
  	handleRequestChange(){
  		var data = this.state.data;
  		data.type = EXERCISE_TYPES[0];
  		data.totalSeries = this.refs.series;
  		this.setState({
  			data: data,
  			changingType : true
  		});
  	},
  	render() {
  		let seriesSlider = '',repetitionsSlider ='',durationSlider='',restSlider='', seriesDetails=[];
  		var repetitions_container = '';
  		var series_container = '';
	  	let exerciseTypeTpl = '';

	    if (this.state.changingType) {
	    	exerciseTypeTpl = 	<SelectField value={this.state.data.type} onChange={this.onTypeChange}>
						          	{EXERCISE_TYPES.map(function(value) {
									 	return <MenuItem key={value.value} value={value.value} primaryText={value.label} />
									})}
						        </SelectField>;
	    }else{
	    	let exercise_type = _.find(EXERCISE_TYPES, function(obj) {
					    	return obj.value === EXERCISE_TYPES[0];
						}) || {};
	    	exerciseTypeTpl = <RaisedButton onTouchTap={this.handleRequestChange} label={exercise_type.label + ' (Cambiar tipo)'} primary={true} />;
	    }

	    if(this.state.data.type !== 'circuit'){
	    	seriesSlider = 	<Slider
					          min={1}
					          max={10}
					          step={1}
					          description={'Series: '+(this.state.data.totalSeries || this.refs.series)}
					          defaultValue={parseInt(0)}
					          value={parseInt(this.state.data.totalSeries)}
					          onChange={this.handleSeriesChange}
					        />;
	    }

	    if(this.state.data.type === 'repetitions'){
	    	repetitionsSlider = <Slider
						          min={1}
						          max={30}
						          step={1}
						          defaultValue={parseInt(0)}
						          description={'Repeticiones : '+(this.state.data.repetitions || this.refs.repetitions)}
						          value={parseInt(this.state.data.repetitions)}
						          onChange={this.handleRepetitionsChange}
						        />;
	    }

	    if(this.state.data.type === 'timed'){
	    	durationSlider = 	<Slider
						          min={1}
						          max={120}
						          step={5}
						          defaultValue={parseInt(0)}
						          description={'Duracion de cada serie (Segs): '+(this.state.data.duration || this.refs.duration)}
						          value={this.state.data.duration}
						          onChange={this.handleDurationChange}
						        />;
	    }

	    if(this.state.data.type === 'staggered' && this.state.data.totalSeries > 0){
	    	seriesDetails = <SeriesBuilder handleSerieDataChange={this.handleSerieDataChange} series={this.state.data.series} totalSeries={this.state.data.totalSeries}/>
		}

		if(this.state.data.type === 'circuit' && this.state.data.totalSeries > 0){
	    	seriesDetails = <CircuitBuilder series={this.state.data.series} submitExercises={this.submitExercises} totalSeries={this.state.data.totalSeries}/>
		}
	   	
		restSlider =	<Slider
				          min={1}
				          max={300}
				          step={10}
				          defaultValue={parseInt(0)}
				          description={'Descanso entre series (Segs): '+(this.state.data.rest || this.props.exercise.rest)}
				          value={this.state.data.rest}
				          onChange={this.handleRestChange}
				        />;
		return <div className="form-horizontal">
					<form onSubmit={this.handleSubmit} ref="exerciseForm">
						{this.renderTextInput('name', 'Nombre')}
						{exerciseTypeTpl}
						{seriesSlider}
						{seriesDetails}
						{repetitionsSlider}
						{durationSlider}
						{restSlider}
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