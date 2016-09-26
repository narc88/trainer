_ = lodash;


var {
    List,
    ListItem,
    IconMenu,
    IconButton,
    Avatar,
    MenuItem
    } = MUI;

var {SvgIcons} = MUI.Libs;


SelectableExerciseList = React.createClass({
	getInitialState: function() {
    	return {selected_exercises: []};
  	},
  	addExerciseToSelection(exercise){
  		var selected_exercises = this.state.selected_exercises;
  		selected_exercises.push(exercise);
	    this.setState({selected_exercises: selected_exercises});
  	},
  	selectExercise(exercise){
  		var exercises = [];
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
		this.setState({selected_exercises: []});
	},
	cancelSelected(){
		this.setState({selected_exercises: []});
	},
	render() {
		let onSelect = this.addExerciseToSelection;
		let selectExercise = this.selectExercise;
		let onRemove = this.removeExerciseFromSelection;
	    return <div>
	    			<List>
				      	{this.props.exercises.map(function(object, i){
				      		return <ListItem
				      					key={i}
								        leftAvatar={<Avatar onTouchTap={() => onSelect(object)} src='http://res.cloudinary.com/db6uq4jy9/image/upload/v1466101331/c2w7b99g3o21chn5bmxb.jpg' />}
								        rightIcon={<IconButton  onTouchTap={() => selectExercise(object)} ><SvgIcons.AvPlaylistAdd /></IconButton>}
								        primaryText={object.name}
								        secondaryText={object.description}
								    >
								    </ListItem>
			        	})}
				    </List>
					    	
				  	<button type="button" className="btn btn-default" onClick={this.cancelSelected}>Cancelar</button>
				  	<button type="button" className="btn btn-default" onClick={this.submitSelected}>Agregar</button>
	            </div>;
	}
});
