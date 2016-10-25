
var {
    Paper
    } = MUI;

var {SvgIcons} = MUI.Libs;

var placeholder = document.createElement("li");
placeholder.className = "placeholder";
placeholder.id = "selectablePlaceholder";
var placeholder_exercise = {
	name: "Soltarme aca",
	id: 'xxx'
}

CreateRoutine = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData() {
		let subscription = Meteor.subscribe("exercises");

	    return {
	    	isLoading: !subscription.ready(),
	      	exercises: Exercises.find({}, { sort: { createdAt: -1 } }).fetch(),
	    };
	},
	getInitialState: function() {
    	return {
    			exercise: {},
    			addingExercise:false,
    			routine_exercises: []
    		};
  	},
  	selectExercise(exercise){
  		this.setState({
  						addingExercise: true,
  						exercise: exercise
  					});
  	},
  	dragStart: function(e) {
    	this.dragged = e.currentTarget;
    	e.dataTransfer.effectAllowed = 'move';
    	e.dataTransfer.setData("text/html", e.currentTarget);
  	},
	dragEnd: function(e) {
		var routine_exercises = this.state.routine_exercises;
		routine_exercises = routine_exercises.filter(function(i) {
			return i.id != "xxx"
		});
		this.setState({routine_exercises: routine_exercises});
		this.dragged.style.display = "block";
	    
	    var from = Number(this.dragged.dataset.id);
	    var to = Number(this.over.dataset.id);
	    if(from < to) to--;
	    if(this.nodePlacement == "after") to++;
	    routine_exercises.splice(to, 0, routine_exercises.splice(from, 1)[0]);
	    this.setState({routine_exercises: routine_exercises});
	},
  	dragOver: function(e) {
  		var element = e.target.closest("li");
	    e.preventDefault();
	    this.dragged.style.display = "none";
	    if(element.className == "placeholder") return;
	    this.over = element;
	    var relY = e.clientY - this.over.offsetTop;
	    var height = this.over.offsetHeight / 2;
	    var parent = element.parentNode; 

	    var routine_exercises = this.state.routine_exercises;
	    var from = Number(this.dragged.dataset.id);
	    var to = Number(this.over.dataset.id);
	    if(from < to) to--;
	    if(this.nodePlacement == "after") to++;
	    routine_exercises = routine_exercises.filter(function(i) {
			return i.id != "xxx"
		});
		this.setState({routine_exercises: routine_exercises});

	    routine_exercises.splice(to, 0, placeholder_exercise);
	    this.setState({routine_exercises: routine_exercises});
  	},
  	isRoutineValid(){
  		return (this.state.routine_exercises.length > 3);
  	},
  	submitRoutine(){
	  	if(this.isRoutineValid()){
	  		Meteor.call('addRoutine', routine, function (error, result) {});
	  	}
  	},
  	toggleSelectingExercise(){
  		this.setState({addingExercise: !this.state.addingExercise})
  	},
  	handleSubmit(exercise){
  		let filledExercise = _.assignIn(this.state.exercise, exercise);
  		var exercises = this.state.routine_exercises;
  		exercises.push(filledExercise);
  		this.setState({
  						routine_exercises: exercises,
  						addingExercise:false,
  						exercise:{}
  					});
  	},
	render() {
		var viewport_height = (document.documentElement.clientHeight/2)+'px';
		var style = {height:viewport_height}
		var dragEnd = this.dragEnd;
		var dragStart = this.dragStart;
		var updateExercise = this.updateExercise;
		var select_list = '';
		
	    return 	<div>
		            <div className="exercise-list-scrollable" style={style}>
		                <ul className="list-group" onDragOver={this.dragOver}>
			                {this.state.routine_exercises.map(function(object, i){
					            return <RoutineExercise key={i} i={i} updateExercise={updateExercise} dragEnd={dragEnd} dragStart={dragStart} exercise={object}/>
					        })}
				        </ul>
				        <Paper children={<SvgIcons.ContentSave />} zDepth={4} circle={true} />
		            </div>
		            <ExerciseInfoModal exercise={this.state.exercise} handleSubmit={this.handleSubmit} toggleSelectingExercise={this.toggleSelectingExercise} addingExercise={this.state.addingExercise}/>;
		            <div className="exercise-list-scrollable" style={style}>
					    <SelectableExerciseList exercises={this.data.exercises} selectExercise={this.selectExercise} handleSubmit={this.handleSubmit} toggleSelectingExercise={this.toggleSelectingExercise} addingExercise={this.state.addingExercise}/>
		            </div>
		        </div>;
	}
});
