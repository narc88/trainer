
PlaySessionExercise = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        /*let exercise = this.getOnGoing(routine.exercises);
        let serie = this.getOnGoing(exercise.series);
        console.log(routine.objective+'obj rutina')
        console.log(exercise.name+'nombre ejercicio')
        console.log(serie.number+'numero serie ')*/
        return {
            //Tenemos que inicializar routine en un archivo que se levante y setee un valor por defecto.
            /*routine: routine || {},
            exercise: exercise.object || {},
            exercise_index: exercise.index || 0,
            serie: serie.object || {},
            serie_index: serie.index || 0*/
        };
    },
    render() {
        var serie_logo, serie_name,circuit_progress,remaining_time;
        var classSerieStatus = classNames({ 'resting': this.props.resting },
                                { 'excercising': this.props.exercising });
        if(!this.props.exercise.circuit){
            exercise_logo = <img className='circuit-logo' alt={this.props.exercise.name} src={this.props.exercise.logo}/>;
            circuit_progress =  <div>
                                    <div className="progress">
                                        <div className="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style={{width: this.props.completedPct +'%'}}>
                                            <span className="sr-only">{this.data.completedPct}% Completado</span>
                                        </div>
                                    </div>
                                    <span>{this.props.lapTime}</span><span >Tiempo de vuelta</span>
                                    <span>{this.props.series_counter}></span>/<span>{this.props.total_series}</span>
                                </div>;
            serie_name = <span>Numero de serie: {this.props.serie.number}</span>;
        }else{
            serie_name =    <div>
                                <h3>{this.props.serie.name}</h3>
                                <span>{this.props.serie.category}</span>
                            </div>;
        }
        
        if(this.props.serie.logo){
            serie_logo = <img src={this.props.serie.logo} />;
        }

        if(this.props.serie.type === 'timed'){
            remaining_time = <span>Tiempo que falta {this.props.timeRemaning}</span>;
        }

        return (
                <div className="thumbnail">
                    {exercise_logo}
                    <div className="caption">
                        <h3>{this.props.exercise.name}</h3>
                        <p>{this.props.exercise.description}</p>
                        {circuit_progress}
                        <div className="thumbnail" className={classSerieStatus}>
                            {serie_logo}
                            <div className="caption">
                                {serie_name}
                            </div>
                            <span> Recomendado </span>
                            <span>{this.props.serie.recommended_weight}</span>
                            <span>{this.props.serie.recommended_weight_measure}</span>
                            {remaining_time}
                            <button type="button" onclick={this.loadInfo} className="btn btn-default">Agregar detalles</button>
                            <button type="button" onclick={this.startStopSerie} className="btn btn-default">Terminé!</button>
                        </div>

                    </div>
                </div>
            );
    }
});