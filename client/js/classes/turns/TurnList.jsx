var WEEKDAYS = [
	{'value':0, 'label':'Domingo'},
	{'value':1 , 'label':'Lunes'},
	{'value':2 , 'label':'Martes'},
	{'value':3 , 'label':'Miércoles'},
	{'value':4 , 'label':'Jueves'},
	{'value':5 , 'label':'Viernes'},
	{'value':6 , 'label':'Sábado'}
]

TurnList = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData() {
		let subscription = Meteor.subscribe("turns");

	    return {
	    	isLoading: !subscription.ready(),
	      	turns: Turns.find({}, { sort: { createdAt: -1 } }).fetch() || [],
	    };
	},
	componentDidMount() {
	},
	render() {
	    return <div>
	    			<h1>Turns</h1>
	    			<ul class="list-group">
		                {this.data.turns.map(function(object, i){
				            return <TurnItem turn={object} key={object._id}/>
				        })}
			        </ul>
	            </div>;
	}
});
