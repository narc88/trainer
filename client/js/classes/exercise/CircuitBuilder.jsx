
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
  	submitSelection(){
  		this.props.submitExercise(this.state.selected_exercises);
  	},
  	togglePickExercise(exercise){
  		let exercises = this.state.selected_exercises;
  		let index = _.findIndex(users, function(o) { return o._id == exercise._id; });
  		if(index > 0){
  			exercises = _.remove(exercises, function(n) {
			  return n._id === exercise._id;
			});
  		}else{
  			exercises.push(exercise);
  		}

  		this.setState({'selected_exercises':exercises})
  		
  	},
	render() {;
		let seriesDetails = [];
	    let num_series = 0;
	    let handleSeriesChange = this.props.handleSerieDataChange;
	    let togglePickExercise = this.togglePickExercise;
	    let series = this.props.series;
    	if(series && this.props.totalSeries && series.length === this.props.totalSeries){
    		num_series = this.props.totalSeries;
    	
			_.times( num_series , (index) => {
				seriesDetails.push(<CircuitExercise
			          min = {1}
			          max = {30}
			          key = {index}
			          step = {1}
			          index = {index}
			          handleSeriesChange = {handleSeriesChange}
			          value = {series[index].repetitions}
			        />);	
			});

		}
		
    	return <div>
    				<FlatButton
				        label="Seleccionar Ejercicios"
				        secondary={true}
				        onTouchTap={this.selectExercises}
				    />
				    {seriesDetails}
				    <Dialog
			          title='Seleccionar Ejercicios'
			          actions={<FlatButton
						        label="Cancelar"
						        secondary={true}
						        onTouchTap={this.props.toggleSelectingExercise}
						      />,
						      <FlatButton
						        label="Listo"
						        secondary={true}
						        keyboardFocused={true}
						        onTouchTap={this.props.handleSubmit}
						      />}
			          modal={false}
			          open={this.state.addingExercises}
			          onRequestClose={this.props.handleClose}
			          className="form-list-scrollable"
			          autoScrollBodyContent={true}
			        >
			          	<List>
					      	{this.data.exercises.map(function(object, i){
					      		return <ListItem
									        leftAvatar={<Avatar onTouchTap={() => togglePickExercise(object)} src='http://res.cloudinary.com/db6uq4jy9/image/upload/v1466101331/c2w7b99g3o21chn5bmxb.jpg' />}
									        primaryText={object.name}
									        secondaryText={object.description}
									    >
									    </ListItem>
				        	})}
					    </List>
			        </Dialog>
			    </div>;
	}
});