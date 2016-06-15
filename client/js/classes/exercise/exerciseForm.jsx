var OBJECTIVES = [
	'Entrenamiento deportivo',
	'Flexibilidad',
	'Potencia',
	'Bajar de peso',
	'Rehabilitación'
]

var CATEGORIES = [
	'Zona Media',
	'Biceps',
	'Tren Inferior',
	'Coordinativo',
	'Activador'
]

var DAYS = [1,2,3,4,5];





ExerciseForm = React.createClass({
	getInitialState() {
		return {errors: {}}
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
		var fields = ['name', 'category', 'tags', 'description']
		var errors = {}
		fields.forEach(function(field) {
			var value = trim(this.refs[field].value)
			console.log(field+'-'+value.toString());
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
  	handleSubmit() {
	  	alert(JSON.stringify({submitted: this.getFormData()}))

  	},
  	getFormData() {
		var data = {
				//Categoría, duracion, series... Se llenan cuando armas la rutina.
			  	name: this.refs.name.value,
			  	tags: this.refs.tags.value,
			  	description: this.refs.description.value,
				tips: this.refs.tips.value,
				explanation: this.refs.explanation.value
			};
		return data;
  	},
  	render() {
		return <div className="form-horizontal">
					<form onSubmit={this.handleSubmit} ref="exerciseForm">
						{this.renderTextInput('name', 'Nombre')}
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
		var options = values.map(function(value) {
		 	return <option key={value} value={value}>{value}</option>
		})
		return this.renderField(id, label,
				  <select className="form-control" key={id}  id={id} ref={id}>
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