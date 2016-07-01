
SelectableExerciseListItem = React.createClass({
	
	getInitialState: function() {
    	return {selected: false};
  	},
  	toggleSelection: function() {
    	if(this.state.selected){
    		this.setState({selected: false});
    		this.props.removeExerciseFromSelection(this.props.exercise);
    	}else{
    		this.setState({selected: true});
    		this.props.addExerciseToSelection(this.props.exercise);
    	}
  	},
	render() {
		var classSerieStatus = classNames({ 'disabled': this.state.selected }, 'list-group-item' );
	    return	<li className={classSerieStatus} onClick={this.toggleSelection}>
	    			<div className="media">
						<div className="media-left">
						    <a href="#">
						    	<img className="media-object exercise-list-img img-circle" src="http://res.cloudinary.com/db6uq4jy9/image/upload/v1466101331/c2w7b99g3o21chn5bmxb.jpg"  alt="..." />
						    </a>
						</div>
						<div className="media-body">
						    <h4 className="media-heading">{this.props.exercise.name}</h4>
						    {this.props.exercise.description}
						</div>
		            </div>
		        </li>;
	}
});