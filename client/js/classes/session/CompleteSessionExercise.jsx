// Complete Routine Exercise - Represents and exercise in the complete view of the routine.
CompleteSessionExercise = React.createClass({
  
  loadExerciseInfo(){

  },
  loadExerciseVideo(){

  },
  loadExerciseTips(){

  },
  render() {
    var recommended_weight = 0, serie = {};
    if(this.props.exercise.recommended_weight){
      recommended_weight = <span className="label label-info">Peso recomendado {this.props.exercise.recommended_weight}{this.props.exercise.recommended_weight_measure}</span>
    }
    var classStatus = classNames('list-group-item', 
                                { 'list-group-item-success': (this.props.exercise.status === 'finished') },
                                { 'list-group-item-info': (this.props.exercise.status === 'going on') },
                                { 'list-group-item-warning': (this.props.exercise.status === 'to do') });
    let collapse_id = 'collapseEx'+this.props.exercise._id;
    let collapse_target = '#collapseEx'+this.props.exercise._id;
    //Constants used for the classes
    if(this.props.exercise.circuit){
      serie = <CompleteSessionCircuit series={this.props.exercise.series} />;
    }else{
      serie = <CompleteSessionSerie series={this.props.exercise.series} />;
    }
    return (
      <li className={classStatus} data-toggle="collapse" data-target={collapse_target} aria-expanded="false" aria-controls={collapse_id} >
        <h4 className="list-group-item-heading">{this.props.exercise.name}</h4>
        <div className="collapse" id={collapse_id}>
          Series: <span>{this.props.exercise.series.length}</span>
          {recommended_weight}
          <button type="button" onClick={this.loadExerciseInfo} title="Información" className="btn btn-default" data-toggle="modal" data-target="#infoModal">
            <span className="glyphicon glyphicon-info-sign"></span>
          </button>
          <button type="button" onClick={this.loadExerciseVideo} title="Video Explicativo" className="btn btn-default" data-toggle="modal" data-target="#videoModal">
            <span className="glyphicon glyphicon-facetime-video"></span>
          </button>
          <button type="button" onClick={this.loadExerciseTips} title="Tips" className="btn btn-default" data-toggle="modal" data-target="#tipsModal">
            <span className="glyphicon glyphicon-list"></span>
          </button>
          {serie}
        </div>
      </li>
    );
  }
});

