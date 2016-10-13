
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
  		var series = this.state.series;
  		series[index].repetitions = data;
    	this.setState({series: series});
  	},
	render() {
	    let seriesDetails = [];
	    let num_series = 0;
	    let handleSeriesChange = this.handleSeriesChange;
    	if(this.props.totalSeries){
    		num_series = this.props.totalSeries;
    	
			_.times( num_series , (current, index) => {
				seriesDetails.push(<Slider
			          min={1}
			          max={30}
			          step={1}
			          description={'Reps. Serie nº '+{index}+' :PORONGA'}
			          onChange={handleSeriesChange.bind(index)}
			        />);	
			});

		}
		
    	return <div>
			        {seriesDetails}
			    </div>;
	}
});