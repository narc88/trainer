
Meteor.methods({
    /*addRoutine(text) {
        // Make sure the user is logged in before inserting a routine
        if (! Meteor.userId()) {
          //throw new Meteor.Error("not-authorized");
        }
     
        var routine = {
        'routine_day' : 2,
        'purpose' : 'Aceleración Metabólica',
        'objective' : 'Entrenamiento De Handball',
        'exercises' : [{
                            '_id' : 1,
                            'name' : 'Movimiento articular',
                            'description' : 'Los ejercicios abdominales sirven para fortalecer los músculos abdominales. ',
                            'category' : 'Calentamiento',
                            'duration' : 5,
                            'series'   : [{'number':1,  'status' :'finished' , 'type' : 'timed'}],
                            'status'   : 'finished',
                            'logo'     : 'images/exercise2.jpg'
                        },
                        {
                            '_id' : 2,
                            'name' : 'Abdominales en Plancha',
                            'description' : 'Los ejercicios abdominales sirven para fortalecer los músculos abdominales. ',
                            'category' : 'Zona Media',
                            'series' : [{'number':1 , 'status' :'finished', 'duration' : 30,'type' : 'timed'},
                                        {'number':2 , 'status' :'finished','duration' : 30, 'type' : 'timed'},
                                        {'number':3 , 'status' :'finished','duration' : 30, 'type' : 'timed'},
                                        {'number':4 , 'status' :'finished','duration' : 30, 'type' : 'timed'} ],
                            
                            'status' :'finished',
                            'logo'     : 'images/exercise1.jpg'
                        },
                        {
                            '_id' : 3,
                            'name' : 'Abdominales Colgado',
                            'description' : 'Los ejercicios abdominales sirven para fortalecer los músculos abdominales. ',
                            'category' : 'Zona Media',
                            'series' : [{'number':1 , 'status' :'finished', 'type' : 'repetitions', 'repetitions' : 8},
                                        {'number':2 , 'status' :'finished', 'type' : 'repetitions', 'repetitions' : 8},
                                        {'number':3 , 'status' :'finished', 'type' : 'repetitions', 'repetitions' : 8},
                                        {'number':4 , 'status' :'finished', 'type' : 'repetitions', 'repetitions' : 8} ],
                            'status' :'finished',
                            'logo'     : 'images/exercise3.jpg'
                        },
                        {
                            '_id' : 4,
                            'name' : 'Arranques',
                            'description' : 'Los ejercicios abdominales sirven para fortalecer los músculos abdominales. ',
                            'category' : 'Activador',
                            'series' : [{'number':1 , 'status' :'finished', 'type' : 'repetitions', 'repetitions' : 8},
                                        {'number':2 , 'status' :'finished', 'type' : 'repetitions', 'repetitions' : 8},
                                        {'number':3 , 'status' :'finished', 'type' : 'repetitions', 'repetitions' : 8},
                                        {'number':4 , 'status' :'finished', 'type' : 'repetitions', 'repetitions' : 8} ],
                            'recommended_weight' : 10,
                            'recommended_weight_measure' : 'Kg',
                            'status' :'finished',
                            'logo'     : 'images/exercise4.jpg'
                        },
                        {
                            '_id' : 4,
                            'name' : 'Sentadillas',
                            'description' : 'Los ejercicios abdominales sirven para fortalecer los músculos abdominales. ',
                            'category' : 'Potencia',
                            'series' : [{'number':1 , 'status' :'finished', 'type' : 'repetitions' , 'repetitions' : 8},
                                        {'number':2 , 'status' :'finished', 'type' : 'repetitions', 'repetitions' : 8},
                                        {'number':3 , 'status' :'finished', 'type' : 'repetitions', 'repetitions' : 8},
                                        {'number':4 , 'status' :'going on', 'type' : 'repetitions', 'repetitions' : 8} ],
                            'recommended_weight' : 25,
                            'recommended_weight_measure' : 'Kg',
                            'status'   : 'going on',
                            'logo'     : '/images/exercise5.jpg'
                        },
                        {
                            '_id' : 5,
                            'name' : 'Pique Corto',
                            'description' : 'Los ejercicios abdominales sirven para fortalecer los músculos abdominales. ',
                            'category' : 'Potencia',
                            'series' : [{'number':1 , 'status' :'to do', 'type' : 'repetitions', 'repetitions' : 8, 'rest' : 15},
                                        {'number':2 , 'status' :'to do', 'type' : 'repetitions', 'repetitions' : 8, 'rest' : 15},
                                        {'number':3 , 'status' :'to do', 'type' : 'repetitions', 'repetitions' : 8, 'rest' : 15},
                                        {'number':4 , 'status' :'to do', 'type' : 'repetitions', 'repetitions' : 8, 'rest' : 15}],
                            'status'   : 'to do',
                            'logo'     : '/images/exercise1.jpg'
                        },
                        {
                            '_id' : 6,
                            'name' : 'Circuito',
                            'description' : 'Los ejercicios abdominales sirven para fortalecer los músculos abdominales. ',
                            'category' : 'Aceleración Metabólica',
                            'series' : [
                                {
                                    'number':1 ,
                                    'name' : 'Coordinativo Escalera',
                                    'category' : 'Coordinación',
                                    'description' : 'A mover las patas ameo ',
                                    'type' : 'timed',
                                    'duration' : 15,
                                    'rest' : 15,
                                    'logo'     : '/images/exercise1.jpg'

                                },
                                {
                                    'number':2,
                                    'name' : 'Golpes con pesas',
                                    'category' : 'Coordinación',
                                    'description' : 'Tirar piñas te cansa un monton ',
                                    'recommended_weight' : 2,
                                    'recommended_weight_measure' : 'Kg',
                                    'type' : 'timed',
                                    'duration' : 15,
                                    'rest' : 15,
                                    'logo'     : '/images/exercise2.jpg'
                                },
                                {
                                    'number':3,
                                    'name' : 'Lanzamiento de pelota a la pared',
                                    'category' : 'Coordinación',
                                    'description' : 'Lanzamiento de pelota para fortalecer zona media y brazos ',
                                    'recommended_weight' : 5,
                                    'recommended_weight_measure' : 'Kg',
                                    'type' : 'timed',
                                    'duration' : 15,
                                    'rest' : 15,
                                    'logo'     : '/images/exercise4.jpg'
                                },
                                {
                                    'number':4 ,
                                    'name' : 'Saltos',
                                    'category' : 'Coordinación',
                                    'description' : 'Saltar es una masa',
                                    'type' : 'timed',
                                    'duration' : 15,
                                    'rest' : 15,
                                    'logo'     : '/images/exercise5.jpg'
                                }
                                ],
                            'duration' : 30,
                            'circuit': true,
                            'status'   : 'to do',
                            'started' : false,
                            'started_datetime' : 0
                        },
                        {
                            '_id' : 7,
                            'name' : 'Elongación',
                            'category' : 'Elongación',
                            'description' : 'Si no elongas mañana te va a doler hasta el culo ',
                            'status'   : 'to do',
                            'series'    : [{'number':1,  'status' :'to do'}],
                            'logo'     : '/images/exercise1.jpg'
                        }]
                };
        Sessions.insert(routine , function (error, result) {
            if (error) {
                throw error;
            }
        });
    },
 
    removeRoutine(routineId) {
        const routine = Sessions.findOne(routineId);
        if (routine.private && routine.owner !== Meteor.userId()) {
          // If the routine is private, make sure only the owner can delete it
          //throw new Meteor.Error("not-authorized");
        }
        Sessions.remove(routineId);
    },

    moveToNextSerie(id, actual_exercise_index, actual_serie_index ){
        console.log("llamaban los señores");
        routine = Sessions.findOne({ '_id' : id});
        console.log('Session'+id);
        console.log('actual_exercise_index'+actual_exercise_index);
        console.log('actual_serie_index'+actual_serie_index);

        if(routine.exercises[ actual_exercise_index ].status === 'going on'){
            routine.exercises[ actual_exercise_index ].series[ actual_serie_index ].status = 'finished';
            if(routine.exercises[ actual_exercise_index ].series[ actual_serie_index + 1 ]){
                
                actual_serie_index = actual_serie_index + 1;
                routine.exercises[ actual_exercise_index ].series[ actual_serie_index ].status = 'going on';
                actual_exercise = routine.exercises[ actual_exercise_index ];
            
            }else if(routine.exercises[ actual_exercise_index ].series[0] && routine.exercises[ actual_exercise_index ].circuit){
            
                routine.exercises[ actual_exercise_index ].series[0].status = 'going on';
                actual_serie_index = 0;
                actual_exercise = routine.exercises[ actual_exercise_index ];
            
            }else if(!routine.exercises[ actual_exercise_index ].series[ actual_serie_index + 1 ] && routine.exercises[ actual_exercise_index + 1 ]){
                //No more series but there is pending excercises.
                console.log('Next exercise');
                routine.exercises[ actual_exercise_index ].status = 'finished';
                if(routine.exercises[ actual_exercise_index + 1]){
                    actual_exercise_index = actual_exercise_index + 1;
                    routine.exercises[ actual_exercise_index].status = 'going on';
                    routine.exercises[ actual_exercise_index].series[0].status = 'going on';
                    actual_serie_index = 0;
                    actual_exercise = routine.exercises[ actual_exercise_index];
                }
            }
        }else{
            console.log('La serie no tiene el estado deseado'+actual_exercise.series[ actual_serie_index ].status);
        }
        Sessions.update({ '_id' : id}, routine, function(err, cantAffected){
            if(err){
                console.log(err);
            }else{
                return routine;
            }
        });
    },
    startExercise(id, actual_exercise_index){
        console.log("Start Circuit");
        routine = Sessions.findOne({ '_id' : id});
        
        if(routine.exercises[ actual_exercise_index ].series[0] && routine.exercises[ actual_exercise_index ].circuit){
            
            routine.exercises[ actual_exercise_index ].started = true;
            routine.exercises[ actual_exercise_index ].started_datetime = new Date();
            
        }else{
            console.log('La serie no tiene el estado deseado'+actual_exercise.series[ actual_serie_index ].status);
        }
        Sessions.update({ '_id' : id}, routine, function(err, cantAffected){
            if(err){
                console.log(err);
            }else{
                return routine;
            }
        });
    },
  
getRoutine(id) {
    let routine;
    
    if (! Meteor.userId()) {
      //throw new Meteor.Error("not-authorized");
    }
    routine = Sessions.find({ '_id' : id});
    return routine;
    //Session.set("routine", routine);
  },
*/
});