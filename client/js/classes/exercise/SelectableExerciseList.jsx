_ = lodash;

SelectableExerciseList = React.createClass({
	getInitialState: function() {
    	return {selected_exercises: []};
  	},
  	addExerciseToSelection(exercise){
  		var selected_exercises = this.state.selected_exercises;
  		selected_exercises.push(exercise);
	    this.setState({selected_exercises: selected_exercises});
  	},
  	removeExerciseFromSelection(exercise){
  		var selected_exercises = this.state.selected_exercises;
  		selected_exercises = _.remove(selected_exercises, function(currentObject) {
		    return currentObject._id === exercise._id;
		});
	    this.setState({selected_exercises: selected_exercises});
  	},
	submitSelected(){
		this.props.selectExercise(this.state.selected_exercises);
	},
	cancelSelected(){
		this.setState({selected_exercises: []});
	},
	render() {
		let onSelect = this.addExerciseToSelection;
		let onRemove = this.removeExerciseFromSelection;
	    return <div>
	    			<ul className="list-group">
		                {this.props.exercises.map(function(object, i){
				            return <SelectableExerciseListItem addExerciseToSelection={onSelect} removeExerciseFromSelection={onRemove} exercise={object} key={object._id}/>
				        })}
				        <li>
					    	<div className="btn-group" role="group" aria-label="...">
							  	<button type="button" className="btn btn-default" onClick={this.cancelSelected}>Cancelar</button>
							  	<button type="button" className="btn btn-default" onClick={this.submitSelected}>Agregar</button>
							</div>
					    </li>
			        </ul>
	            </div>;
	}
});
