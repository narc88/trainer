
ExerciseItem = React.createClass({
	render() {
	    return	<div class="media">
					<div class="media-left">
					    <a href="#">
					    	<img class="media-object" src="..." alt="..." />
					    </a>
					</div>
					<div class="media-body">
					    <h4 class="media-heading">{this.props.exercise.name}</h4>
					    {this.props.exercise.description}
					</div>
	            </div>;
	}
});
