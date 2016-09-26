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
  		this.props.selectExercise(exercise);
  	},
  	removeExerciseFromSelection(exercise){
  		var selected_exercises = this.state.selected_exercises;
  		selected_exercises = _.remove(selected_exercises, function(currentObject) {
		    return currentObject._id === exercise._id;
		});
	    this.setState({selected_exercises: selected_exercises});
  	},
	render() {
		let onSelect = this.addExerciseToSelection;
		let selectExercise = this.selectExercise;
	    return <div>
	    			<List>
				      	{this.props.exercises.map(function(object, i){
				      		return <ListItem
				      					key={i}
								        leftAvatar={<Avatar onTouchTap={() => onSelect(object)} src='http://res.cloudinary.com/db6uq4jy9/image/upload/v1466101331/c2w7b99g3o21chn5bmxb.jpg' />}
								        rightIcon={<IconButton  onTouchTap={() => selectExercise(object)} ><SvgIcons.AvPlaylistAdd /></IconButton>}
								        primaryText={object.name}
								        secondaryText={object.description}
								    ></ListItem>
			        	})}
				    </List>
	            </div>;
	}
});
