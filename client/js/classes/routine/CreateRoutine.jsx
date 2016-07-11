
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
    	return {routine_exercises: []};
  	},
  	selectExercise(exercises){
  		var routine_exercises =  this.state.routine_exercises.concat(exercises);
	    this.setState({routine_exercises: routine_exercises});
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
  	addNewExercise(){
  		this.setState({state: 'selecting_exercise'});
  	},
	render() {
		var viewport_height = (document.documentElement.clientHeight/2)+'px';
		var style = {height:viewport_height}
		var dragEnd = this.dragEnd;
		var dragStart = this.dragStart;
		var select_list = '';
		if(this.state.state === 'selecting_exercise'){
			select_list = <SelectableExerciseList exercises={this.data.exercises} selectExercise={this.selectExercise}/>
		}

	    return 	<div>
		            <div className="exercise-list-scrollable" style={style}>
		                <ul className="list-group" onDragOver={this.dragOver}>
			                {this.state.routine_exercises.map(function(object, i){
					            return <RoutineExercise key={i} i={i} dragEnd={dragEnd} dragStart={dragStart} exercise={object}/>
					        })}
				        </ul> 
		            </div>
		            <div className="exercise-list-scrollable" style={style}>
		                <button className="col-xs-12 col-sm-6 col-md-3 list-group-item clickable" onClick={this.addNewExercise}>
				        	<span className="glyphicon glyphicon-plus"></span>
				        	<span className="">	Agregar Ejercicios</span>
				        </button>
					    {select_list} 
		            </div>
		        </div>;
	}
});