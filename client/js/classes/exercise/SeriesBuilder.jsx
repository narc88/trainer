
var {
    Dialog,
    Divider,
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
    				<Divider inset={false} />
			        	{seriesDetails}
			        <Divider inset={false} />
			    </div>;
	}
});