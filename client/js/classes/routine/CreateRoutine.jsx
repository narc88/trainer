var placeholder = document.createElement("li");
placeholder.className = "placeholder";

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
    	// Firefox requires dataTransfer data to be set
    	e.dataTransfer.setData("text/html", e.currentTarget);
  	},
	dragEnd: function(e) {
	    this.dragged.style.display = "block";
	    this.dragged.parentNode.removeChild(placeholder);
	    // Update data
	    var routine_exercises = this.state.routine_exercises;
	    var from = Number(this.dragged.dataset.id);
	    var to = Number(this.over.dataset.id);
	    if(from < to) to--;
	    if(this.nodePlacement == "after") to++;
	    routine_exercises.splice(to, 0, routine_exercises.splice(from, 1)[0]);
	    this.setState({routine_exercises: routine_exercises});
	},
  	dragOver: function(e) {
	    e.preventDefault();
	    this.dragged.style.display = "none";
	    if(e.target.className == "placeholder") return;
	    this.over = e.target;
	    // Inside the dragOver method
	    var relY = e.clientY - this.over.offsetTop;
	    var height = this.over.offsetHeight / 2;
	    var parent = e.target.parentNode;
	    
	    if(relY > height) {
	      	this.nodePlacement = "after";
	      	parent.insertBefore(placeholder, e.target.nextElementSibling);
	    }
	    else if(relY < height) {
	      	this.nodePlacement = "before"
	      	parent.insertBefore(placeholder, e.target);
	    }
  	},
  	addNewExercise(){
  		this.setState({state: 'selecting_exercise'});
  	},
	render() {
		var viewport_height = document.documentElement.clientHeight;
		var dragEnd = this.dragEnd;
		var dragStart = this.dragStart;
		var select_list = '';
		if(this.state.state === 'selecting_exercise'){
			select_list = <SelectableExerciseList exercises={this.data.exercises} selectExercise={this.selectExercise}/>
		}else{

		}
	    return 	<Splitter style={{height:viewport_height}}
		                         orientation='horizontal'
		                         position='40%'
		                         onDragEnd={e => console.log(e.clientX)}>
		            <div className="exercise-list-scrollable">
		                <ul className="list-group" onDragOver={this.dragOver}>
			                {this.state.routine_exercises.map(function(object, i){
					            return 	<li className="list-group-item clickable"
								        	data-id = {i}
								            key = {i}
								            draggable = "true"
								            onDragEnd = {dragEnd}
								            onDragStart = {dragStart}>
							    			<div className="media">
												<div className="media-left">
												    <a href="#">
												    	<img className="media-object exercise-list-img img-circle" src="http://res.cloudinary.com/db6uq4jy9/image/upload/v1466101331/c2w7b99g3o21chn5bmxb.jpg"  alt="..." />
												    </a>
												</div>
												<div className="media-body">
												    <h4 className="media-heading">{object.name}</h4>
												    {object.description}
												    <span className="badge"> 0 x 0</span>
												</div>
								            </div>
								        </li>
					        })}
				        </ul> 
		            </div>
		            <div className="exercise-list-scrollable">
		                <button className="col-xs-12 col-sm-6 col-md-3 list-group-item clickable" onClick={this.addNewExercise}>
				        	<span className="glyphicon glyphicon-plus"></span>
				        	<span className="">	Agregar Ejercicios</span>
				        </button>
					    {select_list} 
		            </div>
		        </Splitter>;
	}
});
