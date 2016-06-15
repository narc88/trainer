
PlaySession = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    let subscription = Meteor.subscribe("sessions");
    let session = Sessions.find( { _id : this.props.id} , { sort: { createdAt: -1 }, limit : 1 }).fetch()[0] || {};
    let temp_exercise = this.getOnGoing(session.exercises || []);
    let exercise = temp_exercise.object;
    let temp_serie = this.getOnGoing(exercise.series || []);
    let serie = temp_serie.object;
    console.log("loaded")
    console.log(session._id);
    if(exercise.circuit && !exercise.started){
      this.loadCircuitStatus();
    }
    return {
      isLoading: !subscription.ready(),
      session: session,
      exercise_index: temp_exercise.index,
      exercise: exercise,
      serie_index: temp_serie.index,
      serie: serie
    };
  },
  loadCircuitStatus() {
    var a = this.state.exercise.started_datetime
  },
  getOnGoing(list){
    var element = {};
    for (var i = 0; i < list.length; i++) {
        if(list[i].status === 'going on'){
            element.object = list[i]; 
            element.index = i;
            return element;
        }
    }
    if(list.length === 0){
      element = {'object':{}, 'index':0};
    }else if(!element){
      element.object = list[0];
      element.index = 0;
    }
    return element;
  },
  getInitialState() {
    return {
        isLoading: true,
        series_counter : 0,
        circuit_started  : false,
        laps : 0,
        total_series: 0,
        completedPct: 0,
        excercising : false,
        resting : false,
        timeSpan : 15,
        restSpan: 15,
        exercise: {},
        serie: {},
        session:{}
    };
  },
  moveToNextSerie(){
    console.log("moveToNextSerie")
    console.log(this.data.session._id);
    Meteor.call('moveToNextSerie', this.data.session._id, this.data.exercise_index, this.data.serie_index, function (error, result) {});
  },
  startCircuit(){
    console.log("startCircuit")
    console.log(this.data.session._id);
    Meteor.call('startCircuit', this.data.session._id, this.data.exercise_index, function (error, result) {});
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
      this.setState({
        series_counter : 0,
        circuit_started : true,
        laps: Math.ceil((this.data.exercise.duration * 60) / lapTime),
        total_series: laps * this.data.exercise.series.length
      });
    }else{
      this.setState({
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
      this.setState({
        series_counter : 0,
        circuit_started : true,
        laps: Math.ceil((this.data.exercise.duration * 60) / lapTime),
        total_series: laps * this.data.exercise.series.length
      });
    }else{
      this.setState({
        series_counter : this.state.series_counter++
      });
      if( this.state.series_counter >= this.state.total_series){
        Meteor.call('moveToNextExercise', this.state.data, this.getSerie() );
      }
    }
  },
  initSerie(){
        if(this.data.serie.circuit){
            this.startStopSerie(this.data.serie)
        }
        this.autoStartSerie();
    },
    autoStartSerie(){
        this.state.serie.timeinterval = setTimeout(function() {
            this.setState({
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
        this.setState({
              excercising : false,
              resting : false
            });
        this.moveToNextSerie();
    },
    finishTimedSerie(){
        clearTimeout(this.data.serie.timeinterval);
        this.data.serie.timeinterval = undefined;
        this.setState({
              excercising : false,
              resting : false,
              timeRemaning:0
            });

        this.moveToNextSerie();
        
    },
    timeSpanFinished(){
        this.setState({
          timeRemaning:0
        });
        if(!this.data.excercising){
            this.setState({
              excercising : true
            });
        }else if(this.data.excercising && !this.data.resting){
            this.startTimedRest();
        }else if(this.data.excercising && this.data.resting){
            this.setState({
              excercising : false,
              resting : false
            });
            this.moveToNextSerie();
        }
    },
    startTimedSerie() {
        if(this.data.serie.duration){
            this.setState({
              excercising : true
            });
            this.startTimer(this.data.serie.duration);
        }else{
            this.startTimedRest();
        }
    },
    startTimedRest() {
        if(this.data.serie.rest){
            this.setState({
              resting : true
            });
            this.startTimer(this.data.serie.rest);
        }else{
            this.setState({
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
                var serie = this.data.serie;
                serie.timeinterval = undefined;
                this.setState('serie', serie);

                this.timeSpanFinished();
            }
        }, 1000);
    }, 
  render() {
    var template = <div></div>;
    if(!this.data.isLoading){
      template = <div>
                      <header className="jumbotron">
                          <h3>{this.data.session.name}</h3>
                          <div>{this.data.session.purpose}</div>
                          <div>{this.data.session.objective}</div>
                      </header>
                      <PlaySessionExercise exercise={this.data.exercise} serie={this.data.serie} startCircuit={this.startCircuit}  startStopSerie={this.startStopSerie}></PlaySessionExercise>
                  </div>;
    }
    return template;
  }
});
