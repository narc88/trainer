
var SEX = [
	{'value': 'f', 'label':'Femenino'},
	{'value':'m' , 'label':'Masculino'}
]

ClientForm = React.createClass({
	getInitialState() {
		return {
			errors: {},
			data: {}
		}
  	},
  	isValid(frequency) {
  		/*Validation needs to be changed*/
  		var fields = [];
		var errors = {}
  		fields = ['day', 'hour', 'minute', 'frequency'];
		
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
  	handleSubmit(event) {
	  	event.preventDefault();
	  	let client = this.getFormData();
	  	if(this.isValid()){
	  		Meteor.call('addClient', client, function (error, result) {});
	  	}
  	},
  	getFormData() {
		return {
			name: name,
			bloodType: bloodType,
			birthDate: birthDate,
			sex: sex
		};
  	},
  	render() {
  		var form_container = '';
		return <div className="">
					<form onSubmit={this.handleSubmit} ref="">
						{this.renderTextInput('name', 'Nombre')}
						{this.renderDateTime('birthDate', 'Fecha de nacimiento')}
						{this.renderSelect('sex', 'Sexo', SEX)}
						{this.renderTextInput('bloodType', 'Grupo y Factor')}
						<button type="submit">Guardar</button>
					</form>
			</div>;
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
	renderSelect(id, label, values) {
		var options = values.map(function(value) {
		 	return <option key={value.value} value={value.value}>{value.label}</option>
		})
		return this.renderField(id, label,
				  <select className="form-control" key={id}  id={id} ref={id}>
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
	}
})


// Utils

function trim(string) {
  var TRIM_RE = /^\s+|\s+$/g
  return string.replace(TRIM_RE, '');
}