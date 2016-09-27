
var {
    Dialog,
    RaisedButton,
    FlatButton,
    Slider,

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
				series: series,
				type: this.refs.type.value,
				explanation: this.refs.explanation.value,
				repetitions: repetitions,
				duration: duration,
				rest:this.refs.rest.value,
				cant_exercises: cant_exercises
			};
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
	timePickerChange(event, date) {
		var new_date = this.state.data;
		new_date.hour = date.getHours();
		new_date.minute = date.getMinutes();
    	this.setState({data: new_date});
  	},
  	datePickerChange(event, date){
  		var new_date = this.state.data;
		new_date.datetime = date;
    	this.setState({data: new_date});
  	},
  	handleRepetitionsChange(event, data){
  		var a='';
  	},
  	handleSeriesChange(event, data){
  		var a='';
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
	    var form_container = '';
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
							{this.renderSelect('type', 'Tipo', EXERCISE_TYPES)}
							<Slider
					          min={1}
					          max={10}
					          step={1}
					          description='Cantidad de series'
					          defaultValue={4}
					          value={this.state.series}
					          onChange={this.handleSeriesChange}
					        />
							<Slider
					          min={1}
					          max={30}
					          step={1}
					          defaultValue={8}
					          description='Cantidad de repeticiones por serie'
					          value={this.state.repetitions}
					          onChange={this.handleRepetitionsChange}
					        />
					        <Slider
					          min={1}
					          max={120}
					          step={15}
					          defaultValue={30}
					          description='Duracion en segundos de cada serie'
					          value={this.state.duration}
					          onChange={this.handleDurationChange}
					        />
					        <Slider
					          min={1}
					          max={300}
					          step={15}
					          defaultValue={90}
					          description='Descanso en segundos entre cada serie'
					          value={this.state.rest}
					          onChange={this.handleRestChange}
					        />
							{form_container}
						</form>
					</div>
		        </Dialog>
		    </div>
	    );
	}
});