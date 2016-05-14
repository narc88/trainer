// Complete Routine Circuit - Represents circuit with certain quantity of exercises inside it.
CompleteSessionCircuit = React.createClass({
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-body" >
          <h4>Ejercicios del circuito</h4>
          <ul>
            {this.props.series.map(function(serie, i){
              let className;
              if(serie.status === 'going on'){
                className = 'active';
              }
              return <li className="list-group-item {className}">
                        <h5 className="list-group-item-heading" >{serie.name}</h5>
                        <span className="exercise_duration">{serie.duration}</span>
                        <span className="rest_duration">{serie.rest}</span>
                      </li>;
            })}
          </ul>
        </div>
      </div>
    );
  }
});

