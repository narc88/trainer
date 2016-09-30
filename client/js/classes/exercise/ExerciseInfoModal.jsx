
var {
    Dialog,
    RaisedButton,
    FlatButton,
    Slider,
    Chip
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
  	onTypeChange(){
  		var data = this.state.data;
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
  		new_data.series = data;
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
	    var formContainer = '';
	    let exerciseTypeTpl = ''
	    if (this.state.changingType) {
	    	exerciseTypeTpl = 	<SelectField value={this.state.data.type} onChange={this.onTypeChange}>
						          	{values.map(function(value) {
									 	return <MenuItem key={value.value} value={value.value} primaryText={value.label} />
									})}
						        </SelectField>;
	    }else{
	    	exerciseTypeTpl = 	<Chip
						          onRequestDelete={this.handleRequestDelete}
						        >
						          	{ 	_.find(EXERCISE_TYPES, function(obj) {
									    	return obj.value === this.props.exercise.type;
										}).label
						      		}
						        </Chip>;
	    }
	    if(this.state.data.type){
	    	formContainer = <div>
	    						<Slider
						          min={1}
						          max={10}
						          step={1}
						          description={'Series: '+this.state.series}
						          defaultValue={this.props.exercise.series}
						          value={this.state.series}
						          onChange={this.handleSeriesChange}
						        />
								<Slider
						          min={1}
						          max={30}
						          step={1}
						          defaultValue={this.props.exercise.repetitions}
						          description={'Repeticiones : '+this.state.repetitions}
						          value={this.state.repetitions}
						          onChange={this.handleRepetitionsChange}
						        />
	    					</div>;
	    }else{
	    	formContainer = <div>
	    						<Slider
						          min={1}
						          max={120}
						          step={5}
						          defaultValue={this.props.exercise.duration}
						          description={'Duracion de cada serie (Segs): '+this.props.exercise.duration}
						          value={this.state.duration}
						          onChange={this.handleDurationChange}
						        />
						        <Slider
						          min={1}
						          max={300}
						          step={10}
						          defaultValue={this.props.exercise.rest}
						          description={'Descanso entre series (Segs): '+this.props.exercise.rest}
						          value={this.state.rest}
						          onChange={this.handleRestChange}
						        />
	    					</div>;

	    }
	    return (
		    <div>
		        <Dialog
		          title={this.props.exercise.name}
		          actions={actions}
		          modal={false}
		          open={this.props.addingExercise}
		          onRequestClose={this.props.handleClose}
		          className="form-list-scrollable"
		        >
		          	<div className="form-horizontal" id="exerciseInfoModal">
						<form ref="exerciseInfoModal">
							{exerciseTypeTpl}
							{formContainer}
						</form>
					</div>
		        </Dialog>
		    </div>
	    );
	}
});