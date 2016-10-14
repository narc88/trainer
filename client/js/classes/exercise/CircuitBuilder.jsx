
var {
    Dialog,
    Divider,
    RaisedButton,
    FlatButton,
    Slider,
    Chip,
    MenuItem
    } = MUI;

var {SvgIcons} = MUI.Libs;


CircuitBuilder = React.createClass({
  	getInitialState() {
		return {
				selected_exercises : [],
				addingExercises:false
			  }
  	},
  	selectExercises(){
  		this.setState({addingExercises: !this.state.addingExercises})
  	},
	render() {
	    let seriesDetails = [];
	    let num_series = 0;
	    let handleSeriesChange = this.props.handleSerieDataChange;
	    let series = this.props.series;
    	if(series && this.props.totalSeries && series.length === this.props.totalSeries){
    		num_series = this.props.totalSeries;
    	
			_.times( num_series , (index) => {
				seriesDetails.push(<SerieSliderBuilder
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
			          	<div className="form-horizontal" id="exerciseInfoModal">
							<form ref="exerciseInfoModal">
								{exerciseTypeTpl}
								{seriesSlider}
								{seriesDetails}
								{repetitionsSlider}
								{durationSlider}
								{restSlider}
							</form>
						</div>
			        </Dialog>
			    </div>;
	}
});