
PlaySessionExercise = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        let routine = Sessions.get('routine') || {'exercises':[{'series':[{'number':1}]}]};
        let exercise = this.getOnGoing(routine.exercises);
        let serie = this.getOnGoing(exercise.series);
        console.log(routine.objective+'obj rutina')
        console.log(exercise.name+'nombre ejercicio')
        console.log(serie.number+'numero serie ')
        return {
            //Tenemos que inicializar routine en un archivo que se levante y setee un valor por defecto.
            routine: routine || {},
            exercise: exercise.object || {},
            exercise_index: exercise.index || 0,
            serie: serie.object || {},
            serie_index: serie.index || 0
        };
    },
    getOnGoing(list){
        var element;
        for (var i = 0; i < list.length; i++) {
            if(list[i].state === 'going on'){
                element.object = list[i]; 
                element.index = i;
            }
        }
        return list[0];
    },
    getInitialState : function() {
        return {
            series_counter : 0,
            circuit_started  : false,
            laps : 0,
            total_series: 0,
            completedPct: 0,
            excercising : false,
            resting : false,
            timeSpan : 15,
            restSpan: 15
        };
    },
    componentDidMount() {
        Meteor.call('moveToNextSerie', 1,2,3,{}, this.getSerie() );
    },
    updateCircuit(){
        if(!this.state.circuit_started){
            var lapTime = 0,
                laps = Math.ceil((this.data.exercise.duration * 60) / lapTime),
                total_series = this.data.laps * this.data.exercise.series.length;

            for (var i = 0; i < this.data.exercise.series.length; i++) {
                lapTime += this.data.exercise.series[i].duration;
                lapTime += this.data.exercise.series[i].rest;
            };
            this.replaceState({
              series_counter : 0,
              circuit_started : true,
              laps: Math.ceil((this.data.exercise.duration * 60) / lapTime),
              total_series: laps * this.data.exercise.series.length
            });
        }else{
            this.replaceState({
              series_counter : this.state.series_counter++,
              completedPct : (this.state.series_counter / this.state.total_series)*100
            });
            if( this.state.series_counter >= this.state.total_series){
                finishCircuit();
            }
        }
    },
    finishCircuit(){
        if(!this.state.circuit_started){
            var lapTime = 0;
            for (var i = 0; i < this.data.exercise.serie.length; i++) {
                lapTime += this.data.serie.duration;
                lapTime += this.data.serie.rest;
            };
            this.replaceState({
              series_counter : 0,
              circuit_started : true,
              laps: Math.ceil((this.data.exercise.duration * 60) / lapTime),
              total_series: laps * this.data.exercise.series.length
            });
        }else{
            this.replaceState({
              series_counter : this.state.series_counter++
            });
            if( this.state.series_counter >= this.state.total_series){
                Meteor.call('moveToNextExercise', this.state.data, this.getSerie() );
            }
        }
    },
    moveToNextSerie(){
        Meteor.call('moveToNextSerie', this.data.exercise, this.getSerie() );
    },
    getSerie(){
        for (var i = 0; i < this.data.exercise.series.length; i++) {
            if(this.data.exercise.series[i].status === 'going on'){
                Session.set('serie', this.data.exercise.series[i]);
                if(this.data.exercise.circuit){
                    console.log('Autoarranque de serie - Emit event')
                    this.autoStartSerie();
                    this.updateCircuit();
                }
            }
        };
    },
    initSerie(){
        if(this.data.serie.circuit){
            this.startStopSerie(this.data.serie)
        }
        this.autoStartSerie();
    },
    autoStartSerie(){
        this.state.serie.timeinterval = setTimeout(function() {
            this.replaceState({
              excercising : false,
              resting : false
            });
            console.log('Autoarranque de serie - Event handler')
            this.startStopSerie(); 
        }, 100);
    },
    startStopSerie(){
        if(this.data.serie.type === 'timed'){
            if(this.data.excercising){
                //Finaliza el ejercicio por un click
                this.finishTimedSerie();
            }else{
                //Inicializa la serie
                this.startTimedSerie();
            }
        }else if(this.data.serie.type === 'repetitions'){
            //Finaliza la serie por repeticiones
            this.finishRepetitionSerie();
        }
    },
    finishRepetitionSerie(){
        this.replaceState({
              excercising : false,
              resting : false
            });
        this.moveToNextSerie();
    },
    finishTimedSerie(){
        clearTimeout(this.data.serie.timeinterval);
        this.data.serie.timeinterval = undefined;
        this.replaceState({
              excercising : false,
              resting : false,
              timeRemaning:0
            });

        this.moveToNextSerie();
        
    },
    timeSpanFinished(){
        this.replaceState({
          timeRemaning:0
        });
        if(!this.data.excercising){
            this.replaceState({
              excercising : true
            });
        }else if(this.data.excercising && !this.data.resting){
            this.startTimedRest();
        }else if(this.data.excercising && this.data.resting){
            this.replaceState({
              excercising : false,
              resting : false
            });
            this.moveToNextSerie();
        }
    },
    startTimedSerie() {
        if(this.data.serie.duration){
            this.replaceState({
              excercising : true
            });
            this.startTimer(this.data.serie.duration);
        }else{
            this.startTimedRest();
        }
    },
    startTimedRest() {
        if(this.data.serie.rest){
            this.replaceState({
              resting : true
            });
            this.startTimer(this.data.serie.rest);
        }else{
            this.replaceState({
              excercising : false,
              resting : false
            });
            this.moveToNextSerie();
        }
    },
    startTimer(secondsSpan) {
        var t = new Date();
        t.setSeconds(t.getSeconds() + secondsSpan);
        this.data.timeRemaning = secondsSpan;
        this.initializeClock(t);
    },
    getTimeRemaining(endtime){
        var t = Date.parse(endtime) - Date.parse(new Date());
        var seconds = Math.floor( (t/1000) % 60 );
        var minutes = Math.floor( (t/1000/60) % 60 );
        var hours = Math.floor( (t/(1000*60*60)) % 24 );
        return {
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    },
    initializeClock(endtime){
        this.data.serie.timeinterval = setTimeout(function() {
            var t = getTimeRemaining(endtime);
            this.data.timeRemaning = t.seconds;
            if(t.total<=0){
                clearTimeout(this.data.serie.timeinterval);
                var serie = Session.get('serie');
                serie.timeinterval = undefined;
                Session.set('serie', serie);
                this.timeSpanFinished();
            }
        }, 1000);
    },
    render() {
        var serie_logo, serie_name,circuit_progress,remaining_time;
        var classSerieStatus = classNames({ 'resting': this.data.resting },
                                { 'excercising': this.data.exercising });
        if(!this.data.exercise.circuit){
            exercise_logo = <img className='circuit-logo' alt={this.data.exercise.name} src={this.data.exercise.logo}/>;
            circuit_progress =  <div>
                                    <div className="progress">
                                        <div className="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style={{width: this.state.completedPct +'%'}}>
                                            <span className="sr-only">{this.data.completedPct}% Completado</span>
                                        </div>
                                    </div>
                                    <span>{this.data.lapTime}</span><span >Tiempo de vuelta</span>
                                    <span>{this.data.series_counter}></span>/<span>{this.state.total_series}</span>
                                </div>;
            serie_name = <span>Numero de serie: {this.data.serie.number}</span>;
        }else{
            serie_name =    <div>
                                <h3>{this.data.serie.name}</h3>
                                <span>{this.data.serie.category}</span>
                            </div>;
        }
        
        if(this.data.serie.logo){
            serie_logo = <img src={this.data.serie.logo} />;
        }

        if(this.data.serie.type === 'timed'){
            remaining_time = <span>Tiempo que falta {this.data.timeRemaning}</span>;
        }

        return (
                <div className="thumbnail">
                    {exercise_logo}
                    <div className="caption">
                        <h3>{this.data.exercise.name}</h3>
                        <p>{this.data.exercise.description}</p>
                        {circuit_progress}
                        <div className="thumbnail" className={classSerieStatus}>
                            {serie_logo}
                            <div className="caption">
                                {serie_name}
                            </div>
                            <span> Recomendado </span>
                            <span>{this.data.serie.recommended_weight}</span>
                            <span>{this.data.serie.recommended_weight_measure}</span>
                            {remaining_time}
                            <button type="button" onclick={this.loadInfo} className="btn btn-default">Agregar detalles</button>
                            <button type="button" onclick={this.startStopSerie} className="btn btn-default">Terminé!</button>
                        </div>

                    </div>
                </div>
            );
    }
});