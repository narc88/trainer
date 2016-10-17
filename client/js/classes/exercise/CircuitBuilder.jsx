
var {
    Dialog,
    Divider,
    RaisedButton,
    FlatButton,
    Slider,
    Chip,
    List,
    ListItem,
    MenuItem,
    Avatar
    } = MUI;

var {SvgIcons} = MUI.Libs;


CircuitBuilder = React.createClass({
  	mixins: [ReactMeteorData],
  	getInitialState() {
		return {
				selected_exercises : [],
				addingExercises:false
			  }
  	},
	getMeteorData() {
		let subscription = Meteor.subscribe("exercises");

	    return {
	    	isLoading: !subscription.ready(),
	      	exercises: Exercises.find({}, { sort: { createdAt: -1 } }).fetch(),
	    };
	},
  	selectExercises(){
  		this.setState({addingExercises: !this.state.addingExercises})
  	},
  	stopSelectingExercises(){
  		this.setState({addingExercises: false})
  	},
  	submitSelection(){
  		this.stopSelectingExercises();
  		this.props.submitExercises(this.state.selected_exercises);
  	},
  	isSelected(exercise){
  		return !_.findIndex( this.state.selected_exercises, function(o) { return o._id == exercise._id; }) < 0;
  	},
  	togglePickExercise(exercise){
  		let exercises = this.state.selected_exercises;
  		let index = _.findIndex(exercises, function(o) { return o._id == exercise._id; });
  		if(index > 0){
  			exercises = _.remove(exercises, function(n) {
			  return n._id === exercise._id;
			});
  		}else{
  			exercises.push(exercise);
  		}

  		this.setState({'selected_exercises':exercises})
  		
  	},
  	validSelection(){
  		return (this.state.selected_exercises.length === this.props.totalSeries);
  	},
	render() {;
		let seriesDetails = [];
	    let num_series = 0;
	    let handleSeriesChange = this.props.handleSerieDataChange;
	    let togglePickExercise = this.togglePickExercise;
	    let series = this.props.series;
	    let isSelected = this.isSelected;		
    	return <div>
    				<FlatButton
				        label="Seleccionar Ejercicios"
				        secondary={true}
				        onTouchTap={this.selectExercises}
				    />
				    {seriesDetails}
				    <Dialog
			          title={'Seleccionar Ejercicios ('+ this.state.selected_exercises.length +' de '+ this.props.totalSeries +')'}
			          actions={<FlatButton
						        label="Cancelar"
						        secondary={true}
						        onTouchTap={this.stopSelectingExercises}
						      />,
						      <FlatButton
						        label="Listo"
						        disabled = {this.validSelection}
						        secondary={true}
						        keyboardFocused={true}
						        onTouchTap={this.submitSelection}
						      />}
			          modal={false}
			          open={this.state.addingExercises}
			          onRequestClose={this.props.handleClose}
			          className="form-list-scrollable"
			          autoScrollBodyContent={true}
			        >
			          	<List>
					      	{this.data.exercises.map(function(object, i){
					      		let icon = (isSelected(object))? <SvgIcons.ActionDone /> : <SvgIcons.AvPlaylistAdd />;
					      		return <ListItem
									        leftAvatar={<Avatar src='http://res.cloudinary.com/db6uq4jy9/image/upload/v1466101331/c2w7b99g3o21chn5bmxb.jpg' />}
									        primaryText={object.name}
									        key={i}
									        onTouchTap = {() => togglePickExercise(object)}
									        secondaryText={object.description}
									        rightIcon={icon}
									    >
									    </ListItem>
				        	})}
					    </List>
			        </Dialog>
			    </div>;
	}
});