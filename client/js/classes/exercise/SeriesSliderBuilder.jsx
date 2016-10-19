
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
				data : {}
			  }
  	},
  	handleSeriesChange(eevent, data){
  		this.props.handleSeriesChange(data, this.props.index)
  	},
	 render() {
	    return <Slider
		          min={this.props.min}
		          max={this.props.max}
		          step={this.props.step}
		          defaultValue={this.props.default}
		          description={'Repeticiones serie '+(this.props.index+1)+': '+(this.state.data.value || this.props.value)}
		          onChange={this.handleSeriesChange}
		        />;
	}
});