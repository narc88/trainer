// Complete Routine Serie - Represents a serie inside an exercise.
CompleteSessionSerie = React.createClass({

  render() {
    return (
      <div>
        <ul>
          {this.props.series.map(function(serie, i){
              let className, repetitions, timed, rest;
              if(serie.status === 'going on'){
                className = 'active';
              }
              if(serie.type === 'repetitions'){
                repetitions = <div><span>{serie.repetitions} Repeticiones.</span></div>;
              }
              if(serie.type === 'timed'){
                timed = <div><span> Duracion: {serie.duration}</span></div>;
              }
              return <li className="list-group-item {className}">
                        <h5 className="list-group-item-heading" >Serie {serie.number}</h5>
                        {repetitions}
                        {timed}
                        <span className="rest_duration">{serie.rest}</span>
                      </li>;
            })}
        </ul>
      </div>
    );
  }
});