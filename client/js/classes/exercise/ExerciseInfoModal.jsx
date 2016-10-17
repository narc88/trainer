
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


var EXERCISE_TYPES = [
	{'value':'repetitions', 'label':'Repeticiones'},
	{'value':'staggered', 'label':'Repeticiones Escalonadas'},
	{'value':'timed', 'label':'Tiempo'},
	{'value':'circuit', 'label':'Circuito'}
]


ExerciseInfoModal = React.createClass({
  	getInitialState() {
		return {
				errors : [],
			    open: false,
			    data: {}
			  }
  	},
  	isValid(frequency) {
  		/*Validation needs to be changed*/
  		var fields = [];
		var errors = {}
  		if(this.refs.frequency.value !== 'weekly'){
  			fields = ['frequency', 'datetime']
  		}else{
  			fields = ['day', 'hour', 'minute', 'frequency']
  		}
		
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
		var isValid = true;
		return isValid;
  	},
  	onTypeChange(data, index, value){
  		var data = this.state.data;
  		data.type = value;
  		this.updateSeries(data);
  	},
  	updateSeries( data ){
  		if(data.type === 'staggered'){
  			data.totalSeries = this.state.data.totalSeries || this.props.exercise.totalSeries;
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
  	handleRequestDelete(){
  		var data = this.state.data;
  		data.type = '';
  		this.setState({
  			data: data,
  			changingType : true
  		});
  	},
	renderSelect(id, label, values, onChange) {
		var options = values.map(function(value) {
		 	return <option key={value.value} value={value.value}>{value.label}</option>
		})
		return this.renderField(id, label,
				  <select className="form-control" onChange={onChange} key={id}  id={id} ref={id}>
					{options}
				  </select>
				);
	},
  	renderField(id, label, field) {
		return <div className={classNames('form-group', 'form-group-sm' , {'has-error': id in this.state.errors})}>
					<label htmlFor={id} className="control-label">{label}</label>
					<div className="">
						{field}
					</div>
				</div>;
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
  	componentDidMount(){
  	},
	render() {
	    const actions = [
	      <FlatButton
	        label="Cancelar"
	        secondary={true}
	        onTouchTap={this.props.toggleSelectingExercise}
	      />,
	      <FlatButton
	        label="Listo"
	        secondary={true}
	        keyboardFocused={true}
	        onTouchTap={this.props.handleSubmit}
	      />,
	    ];
	    let seriesSlider = '',repetitionsSlider ='',durationSlider='',restSlider='', seriesDetails=[];
	    let exerciseTypeTpl = '';
	    let exercise = this.props.exercise;

	    if (!this.state.changingType) {
	    	exerciseTypeTpl = 	<SelectField value={this.state.data.type} onChange={this.onTypeChange}>
						          	{EXERCISE_TYPES.map(function(value) {
									 	return <MenuItem key={value.value} value={value.value} primaryText={value.label} />
									})}
						        </SelectField>;
	    }else{
	    	exerciseTypeTpl = 	<div
						          onTouchTap={this.handleRequestDelete}
						        >
						          	{ 	_.find(EXERCISE_TYPES, function(obj) {
									    	return obj.value === exercise.type;
										}).label
						      		}
						      		<span> (Change Type) </span>
						        </div>;
	    }

	    if(this.state.data.type !== 'circuit'){
	    	seriesSlider = 	<Slider
					          min={1}
					          max={10}
					          step={1}
					          description={'Series: '+(this.state.data.totalSeries || this.props.exercise.totalSeries)}
					          defaultValue={parseInt(this.props.exercise.totalSeries)}
					          value={this.state.data.totalSeries}
					          onChange={this.handleSeriesChange}
					        />;
	    }

	    if(this.state.data.type === 'repetitions'){
	    	repetitionsSlider = <Slider
						          min={1}
						          max={30}
						          step={1}
						          defaultValue={parseInt(this.props.exercise.repetitions)}
						          description={'Repeticiones : '+(this.state.data.repetitions || this.props.exercise.repetitions)}
						          value={this.state.data.repetitions}
						          onChange={this.handleRepetitionsChange}
						        />;
	    }

	    if(this.state.data.type === 'timed'){
	    	durationSlider = 	<Slider
						          min={1}
						          max={120}
						          step={5}
						          defaultValue={parseInt(this.props.exercise.duration)}
						          description={'Duracion de cada serie (Segs): '+(this.state.data.duration || this.props.exercise.duration)}
						          value={this.state.data.duration}
						          onChange={this.handleDurationChange}
						        />;
	    }

	    if(this.state.data.type === 'staggered' && this.state.data.totalSeries > 0){
	    	seriesDetails = <SeriesBuilder handleSerieDataChange={this.handleSerieDataChange} series={this.state.data.series} totalSeries={this.state.data.totalSeries}/>
		}

		if(this.state.data.type === 'circuit' && this.state.data.totalSeries > 0){
	    	seriesDetails = <CircuitBuilder series={this.state.data.series} totalSeries={this.state.data.totalSeries}/>
		}
	   	
		restSlider =	<Slider
				          min={1}
				          max={300}
				          step={10}
				          defaultValue={parseInt(this.props.exercise.rest)}
				          description={'Descanso entre series (Segs): '+(this.state.data.rest || this.props.exercise.rest)}
				          value={this.state.data.rest}
				          onChange={this.handleRestChange}
				        />;
    	return <div>
			        <Dialog
			          title={this.props.exercise.name}
			          actions={actions}
			          modal={false}
			          open={this.props.addingExercise}
			          onRequestClose={this.props.handleClose}
			          className="form-list-scrollable"
			          autoScrollBodyContent={true}
			        >
			          	<div className="form-horizontal" id="exerciseInfoModal">
							<form ref="exerciseInfoModal">
								{exerciseTypeTpl}
								{seriesSlider}
								{seriesDetails}
								{repetitionsSlider}
								{durationSlider}
								{restSlider}
							</form>
						</div>
			        </Dialog>
			    </div>;
	}
});