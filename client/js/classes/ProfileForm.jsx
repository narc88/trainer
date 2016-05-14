
var STATES = [
  'Buenos Aires', 'Catamarca','Chubut', 'Cordoba', 'Corrientes', 'Entre Rios', 'Formosa', 'Jujuy', 'La Pampa', 'La Rioja', 'Mendoza', 'Misiones', 'Neuquen', 'Rio Negro', 'Salta','San Juan', 'San Luis', 'Santa Cruz', 'Santiago del Estero', 'Tierra del fuego'
]

var OBJECTIVES = [
  'Entrenamiento deportivo',
  'Flexibilidad',
  'Potencia',
  'Bajar de peso',
  'Rehabilitación'
]

var DAYS = [1,2,3,4,5];



ProfileForm = React.createClass({
  getInitialState() {
    return {
      email: true
    , question: true
    , submitted: null
    }
  }

, render() {
    var submitted
    if (this.state.submitted !== null) {
      submitted = <div className="alert alert-success">
        <p>ProfileFormContainer data:</p>
        <pre><code>{JSON.stringify(this.state.submitted, null, '  ')}</code></pre>
      </div>
    }

    return <div>
      <div className="panel panel-default">
        <div className="panel-heading clearfix">
          <h3 className="panel-title pull-left">Contact Form</h3>
          <div className="pull-right">
            <label className="checkbox-inline">
              <input type="checkbox"
                checked={this.state.email}
                onChange={this.handleChange.bind(this, 'email')}
              /> Email
            </label>
            <label className="checkbox-inline">
              <input type="checkbox"
                checked={this.state.question}
                onChange={this.handleChange.bind(this, 'question')}
              /> Question
            </label>
          </div>
        </div>
        <div className="panel-body">
          <ProfileFormContainer ref="profileForm"
            email={this.state.email}
            question={this.state.question}
            company={this.props.company}
          />
        </div>
        <div className="panel-footer">
          <button type="button" className="btn btn-primary btn-block" onClick={this.handleSubmit}>Submit</button>
        </div>
      </div>
      {submitted}
    </div>
  }

, handleChange(field, e) {
    var nextState = {}
    nextState[field] = e.target.checked
    this.setState(nextState)
  }

, handleSubmit() {
    if (this.refs.profileForm.isValid()) {
      alert(JSON.stringify({submitted: this.refs.profileForm.getFormData()}))
    }
  }
})

/**
 * A contact form with certain optional fields.
 */
ProfileFormContainer = React.createClass({
  getDefaultProps() {
    return {
      email: true
    , question: false
    }
  }

, getInitialState() {
    return {errors: {}}
  }

, isValid() {
    var fields = ['firstName', 'lastName', 'phoneNumber', 'objective','address', 'city', 'state', 'zipCode']
    if (this.props.email) fields.push('email')
    if (this.props.question) fields.push('question')

    var errors = {}
    fields.forEach(function(field) {
      var value = trim(this.refs[field].value)
      console.log(field+'-'+value.toString());
      if (!value) {
        errors[field] = 'This field is required'
      }
    }.bind(this))
    this.setState({errors: errors})

    var isValid = true
    for (var error in errors) {
      isValid = false
      break
    }
    return isValid
  }

, getFormData() {
    var data = {
      firstName: this.refs.firstName.value
    , lastName: this.refs.lastName.value
    , phoneNumber: this.refs.phoneNumber.value
    , dni: this.refs.dni.value
    , height: this.refs.height.value
    , width: this.refs.width.value
    , objective: this.refs.objective.value
    , daysPerWeek: this.refs.daysPerWeek.value
    , birthDate: this.refs.birthDate.value
    , startDate: this.refs.startDate.value
    , address: this.refs.address.value
    , city: this.refs.city.value
    , state: this.refs.state.value
    , zipCode: this.refs.zipCode.value
    , notes: this.refs.notes.value
    , currentCustomer: this.refs.currentCustomerYes.checked
    }
    if (this.props.email) data.email = this.refs.email.value
    if (this.props.question) data.question = this.refs.question.value
    return data
  }

, render() {
    return <div className="form-horizontal">
      {this.renderTextInput('firstName', 'First Name')}
      {this.renderTextInput('lastName', 'Last Name')}
      {this.renderTextInput('phoneNumber', 'Phone number')}
      {this.renderTextInput('dni', 'DNI')}
      {this.renderTextInput('heigth', 'Altura (Cms)')}
      {this.renderTextInput('width', 'Peso (Kgs)')}
      {this.renderSelect('objective', 'Objetivo', OBJECTIVES)}
      {this.renderSelect('daysPerWeek', 'Dias por semana', DAYS)}
      {this.renderDateTime('birthDate', 'Fecha de Nacimiento')}
      {this.renderDateTime('startDate', 'Fecha en que comenzó en el gimnasio')}
      {this.props.email && this.renderTextInput('email', 'Email')}
      {this.props.question && this.renderTextarea('question', 'Question')}
      {this.renderTextInput('address', 'Dirección')}
      {this.renderTextInput('city', 'Ciudad')}
      {this.renderSelect('state', 'State', STATES)}
      {this.renderTextInput('zipCode', 'Codigo postal')}
      {this.renderTextarea('notes', 'Notas')}
      {this.renderRadioInlines('currentCustomer', 'Are you currently a ' + this.props.company + ' Customer?', {
        values: ['Yes', 'No']
      , defaultCheckedValue: 'No'
      })}
    </div>
  }

, renderTextInput(id, label) {
    return this.renderField(id, label,
      <input type="text" className="form-control" id={id} ref={id}/>
    )
  }

, renderTextarea(id, label) {
    return this.renderField(id, label,
      <textarea className="form-control" id={id} ref={id}/>
    )
  }

, renderSelect(id, label, values) {
    var options = values.map(function(value) {
      return <option key={value} value={value}>{value}</option>
    })
    return this.renderField(id, label,
      <select className="form-control" key={id}  id={id} ref={id}>
        {options}
      </select>
    )
  }
, renderDateTime(id, label){
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
}
, renderRadioInlines(id, label, kwargs) {
    var radios = kwargs.values.map(function(value) {
      var defaultChecked = (value == kwargs.defaultCheckedValue)
      return 
        <label className="radio-inline">
          <input type="radio" ref={id + value} name={id} value={value} defaultChecked={defaultChecked}/>
          <span>{value}</span>
        </label>
    })
    return this.renderField(id, label, radios)
  }

, renderField(id, label, field) {
    return <div className={aaac('form-group', {'has-error': id in this.state.errors})}>
      <label htmlFor={id} className="col-sm-4 control-label">{label}</label>
      <div className="col-sm-6">
        {field}
      </div>
    </div>
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