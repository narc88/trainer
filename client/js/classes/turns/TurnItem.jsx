var WEEKDAYS = [
	{'value':0, 'label':'Domingo'},
	{'value':1 , 'label':'Lunes'},
	{'value':2 , 'label':'Martes'},
	{'value':3 , 'label':'Miércoles'},
	{'value':4 , 'label':'Jueves'},
	{'value':5 , 'label':'Viernes'},
	{'value':6 , 'label':'Sábado'}
]

TurnItem = React.createClass({
	remove(){
	  	Meteor.call('removeTurn', this.props.turn, function (error, result) {});
	},
	render() {
		var weekday = this.props.turn.day;
	    return	<li className="list-group-item">
	    			<span>{lodash.find(WEEKDAYS, function(o) { return o.value == weekday; }).label} - {this.props.turn.hour}:{this.props.turn.minute}</span>
		        	<span className="glyphicon glyphicon-remove pull-right" ng-click={this.remove}></span>
		        </li>;
	}
});