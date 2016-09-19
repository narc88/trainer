var WEEKDAYS = [
	{'value':0, 'label':'Domingo'},
	{'value':1 , 'label':'Lunes'},
	{'value':2 , 'label':'Martes'},
	{'value':3 , 'label':'Miércoles'},
	{'value':4 , 'label':'Jueves'},
	{'value':5 , 'label':'Viernes'},
	{'value':6 , 'label':'Sábado'}
]


var FREQ = [
	{'value': 'weekly', 'label':'Semanal'},
	{'value':'once' , 'label':'Una vez'}
]


var {
    Dialog,
    RaisedButton,
    FlatButton,
    TimePicker,
    } = MUI;

var {SvgIcons} = MUI.Libs;

TurnDialog = React.createClass({
  	getInitialState() {
		return {
				errors : [],
			    open: false,
			    data: { frequency : 'weekly'}
			  }
  	},
	handleOpen() {
	    this.setState({open: true});
	},
	handleClose() {
	    this.setState({open: false});
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
  	} ,
  	handleSubmit() {
	  	event.preventDefault();
	  	let turn = lodash.extend(this.props.turn , this.getFormData());
	  	if(this.isValid()){
	  		turn.user = Meteor.userId();
	  		turn.username = Meteor.user().username || Meteor.user().profile.name

	  		Meteor.call('addTurn', turn, function (error, result) {});
	  	}
  	},
  	changeType(){
  		var data = this.getFormData();
  		this.setState({
  			data: data
  		});
  	},
  	getFormData() {
  		var day = this.refs.day? this.refs.day.value : 0;
  		var hour = this.refs.hour? this.refs.hour.value : 0;
  		var minute = this.refs.minute? this.refs.minute.value : 0;
  		var frequency = this.refs.frequency? this.refs.frequency.value : 'weekly';
  		var datetime = this.refs.datetime? this.refs.datetime.value : ''
		return {
			day: parseInt(day),
			hour: parseInt(hour),
			minute: parseInt(minute),
			frequency: frequency,
			datetime: datetime
		};
  	},
  	changeFreq(){
  		var frequency = this.refs.frequency? this.refs.frequency.value : false;
  		var data = this.state.data;
  		data.frequency = frequency;
  		this.setState({
  			data: data
  		});
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
	render() {
	    const actions = [
	      <FlatButton
	        label="Cancel"
	        primary={true}
	        onTouchTap={this.handleClose}
	      />,
	      <FlatButton
	        label="Submit"
	        primary={true}
	        keyboardFocused={true}
	        onTouchTap={this.handleSubmit}
	      />,
	    ];
	    var form_container = '';
  		if(this.state.data.frequency === 'weekly'){
	  		form_container = 	<div>
	  								{this.renderSelect('day', 'Dia de la semana', WEEKDAYS)}
	  								<TimePicker hintText="Formato 12 horas" onChange={this.timePickerChange}/>
	  							</div>;
	  	}else{
	  		form_container = 	<div>
	  								<DatePicker
								        hintText="Ingrese fecha"
								        onChange={this.datePickerChange}
								    />
	  								<TimePicker hintText="Formato 12 horas" onChange={this.timePickerChange}/>
	  							</div>
	  	}
	    return (
		    <div>
		        <RaisedButton label="Nuevo Turno" onTouchTap={this.handleOpen} />
		        <Dialog
		          title="Dialog With Actions"
		          actions={actions}
		          modal={false}
		          open={this.state.open}
		          onRequestClose={this.handleClose}
		        >
		          	<div className="form-horizontal">
						<form ref="turnForm">
							{this.renderSelect('frequency', 'Frecuencia', FREQ, this.changeFreq)}
							{form_container}
						</form>
					</div>
		        </Dialog>
		    </div>
	    );
	}
});