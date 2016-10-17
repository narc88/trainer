
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

SerieSliderBuilder = React.createClass({
  	getInitialState() {
		return {
				series : []
			  }
  	},
  	handleSeriesChange(data){
  		this.props.handleSeriesChange(data, this.props.index)
  	},
	render() {
	    return <Slider
		          min={this.props.min}
		          max={this.props.max}
		          step={this.props.step}
		          defaultValue={this.props.min}
		          description={'Repeticiones serie '+this.props.index+': '+(this.state.data.duration || this.props.exercise.duration)}
		          onChange={this.handleSeriesChange}
		        />;
	}
});