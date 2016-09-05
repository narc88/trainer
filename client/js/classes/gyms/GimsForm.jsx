
GymsForm = React.createClass({
	getInitialState() {
		return {
				errors: {},
				data: {}
				}
  	},
  	isValid() {
		var fields = ['name', 'introduction', 'description']
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
	  	let gym = this.getFormData();
	  	if(this.isValid()){
	  		Meteor.call('addGym', gym, function (error, result) {});
	  	}
  	},
  	changeType(){
  		var data = this.getFormData();
  		this.setState({
  			data: data
  		});
  	},
  	getFormData() {
		return {
			  	name: this.refs.name.value,
			  	introduction: this.refs.introduction.value,
			  	description: this.refs.description.value
			};
  	},
  	render() {
  		var repetitions_container = '';
  		var series_container = '';
		return <div className="form-horizontal">
					<form onSubmit={this.handleSubmit} ref="exerciseForm">
						{this.renderTextInput('name', 'Nombre')}
						{this.renderTextarea('description', 'Descripción')}
						{this.renderTextarea('introduction', 'Introducción')}
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