
var {
    Dialog,
    RaisedButton,
    FlatButton,
    Slider,
    Chip,
    MenuItem,
    SelectField
    } = MUI;

var {SvgIcons} = MUI.Libs;


var EXERCISE_TYPES = [
	{'value':'repetitions', 'label':'Repeticiones'},
	{'value':'staggered', 'label':'Repeticiones Escalonadas'},
	{'value':'timed', 'label':'Tiempo'},
	{'value':'circuit', 'label':'Circuito'}
]


SeriesBuilder = React.createClass({
  	getInitialState() {
		return {
				series : []
			  }
  	},
  	handleSeriesChange(event, data){
  		var new_data = this.state.data;
  		new_data.totalSeries = data;
  		if(this.state.data.type === 'staggered'){
  			let tempSerie = {
	    		repetitions : 0
	    	};
  			for (var i = 0; i < new_data.totalSeries.length; i++) {
  				new_data.series[i] = tempSerie;
  			}
  		}
    	this.setState({data: new_data});
  	},
	render() {
	    let seriesDetails = [];
	    let num_series = 0;
    	if(this.props.series){
    		num_series = this.props.series.length;
    	}
		_.times( num_series , (index) => {
			seriesDetails.push(<Slider
		          min={1}
		          max={30}
		          step={1}
		          description={'Reps. Serie nº '+{index}+' : '+(this.state.series[index].repetitions)}
		          value={this.state.data.series[index].repetitions}
		          onChange={this.handleSerieDataChange.bind(index, this.state.data.series[index])}
		        />);	
		});
		
    	return <div>
			        {seriesDetails}
			    </div>;
	}
});